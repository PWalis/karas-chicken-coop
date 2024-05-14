"use server";

import zod from "zod";
import prisma from "./data";
import { saltHashPassword } from "./utils";
import { redirect } from "next/navigation";

type registerState = {
  error?: {
    email?: string[],
    password?: string[]
  }, 
  message?: string
}

export async function register(  currentMessage: registerState,
  formData: FormData) {
  const FormSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8, {message: "Password must be at least 8 characters long"}),
  });

  // Validate the form data
  const validatedData = FormSchema.safeParse({
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

  const { salt, hash } = saltHashPassword(data.password);

  // create a user in the database
  try {
    await prisma.user.create({
      data: {
        email: data.email,
        password: hash,
        salt: salt,
      },
    });
  } catch (error) {
    return { message: "failed to register user" };
  }
  redirect("/login")
}
