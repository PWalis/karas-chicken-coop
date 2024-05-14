"use server";

import zod from "zod";
import prisma from "./data";
import { saltHashPassword } from "./utils";
import { redirect } from "next/navigation";

export async function register(  currentMessage: string | undefined,
  formData: FormData) {
  const FormSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
  });

  // Validate the form data
  const validatedData = FormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedData.success) {
    console.log(
      validatedData.error.flatten().fieldErrors.email as any || validatedData.error.flatten().fieldErrors.password as any,
    );
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
    console.log("error registering user", error);
  }
  redirect("/login")
}
