"use server";
import { revalidatePath } from "next/cache";
import prisma from "./data";
import zod from "zod";

const emailFormSchema = zod.object({
  email: zod.string().email(),
});

export async function createEmail(formData: FormData) {
  const validatedData = emailFormSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedData.success) {
    return {
      error: validatedData.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  const data = {
    email: validatedData.data.email,
  };

  try {
    const email = await prisma.email.create({
      data: {
        email: data.email ?? "",
      },
    });
  } catch (error) {
    console.log("error creating email", error);
    return { error: error, message: "error creating email" };
  }
  revalidatePath("/")
  
}
