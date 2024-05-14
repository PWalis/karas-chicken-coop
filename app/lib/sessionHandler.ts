"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import prisma from "./data";
import zod from "zod";
import { hashPassword } from "./utils";

const secretKey = process.env.JWT_SECRET; // create a secret key and save it in a .env file
const key = new TextEncoder().encode(secretKey);

const formSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8, "Password invalid"),
});

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2 hours")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

type loginState = {
  error?: {
    email?: string[];
    password?: string[];
    user?: string[];
    login?: string[];
  };
  message?: string;
};

export async function login(currentMessage: loginState, formData: FormData) {
  // Verify credentials && get the user
  const validatedData = formSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedData.success) {
    return {
      error: validatedData.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }
  const data = {
    email: validatedData.data.email,
    password: validatedData.data.password,
  };

  try {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return {
        error: { user: ["User not found"] },
        message: "Failed to find user",
      };
    }

    const hash = hashPassword(data.password, user.salt);

    if (hash !== user.password) {
      return {
        error: { user: ["Incorrect password"] },
        message: "Failed to validate user",
      };
    }
    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
    const session = await encrypt({ user, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
  } catch (error) {
    return {
      message: "Login failed",
      error: { login: ["Login failed please try again"] },
    };
  }
  redirect("/dashboard/orders");
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Refresh the session so it doesn't expire
  let parsed;
  try {
    parsed = await decrypt(session);
  } catch (error: any) {
    if (error.name === "JWTExpired") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    throw error; // rethrow the error if it's not an expiration error
  }

  if (parsed.user.role !== "ADMIN") {
    console.log("User is not an admin");
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (parsed.user.role === "ADMIN") {
    parsed.expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
    const res = NextResponse.next();
    res.cookies.set({
      name: "session",
      value: await encrypt(parsed),
      httpOnly: true,
      expires: parsed.expires,
    });
    return res;
  }
}
