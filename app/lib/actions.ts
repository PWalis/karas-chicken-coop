"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import prisma from "./data";
import { uploadProductImagesAndReturnUrls } from "./S3Controller";
import { redirect } from "next/navigation";
import { unstable_noStore } from "next/cache";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 7; //7MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

const ImageSchema = z
  .instanceof(File)
  .optional()
  .refine((file) => {
    return !file || file.size <= MAX_UPLOAD_SIZE;
  }, "File size must be less than 7MB")
  .refine((file) => {
    return ACCEPTED_IMAGE_TYPES.includes(file!.type);
  }, "File type must be either jpeg or png");

// const ImageSchema = z.object({
//   size: z.number().max(MAX_UPLOAD_SIZE, "File size must be less than 7MB"),
//   type
//   type: z.string().refine((value) => ACCEPTED_IMAGE_TYPES.includes(value), "File type must be either jpeg or png"),
// });

// this object will be used to validate the form data
const FormSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  price: z.coerce.number({ required_error: "Price is required" }),
  description: z.string({ required_error: "Description is required" }),
  image: z.array(ImageSchema).nonempty({ message: "Image is required" }),
  category: z.string({ required_error: "Category is required" }),
  xs: z.coerce.number({ required_error: "XS is required" }),
  small: z.coerce.number({ required_error: "Small is required" }),
  medium: z.coerce.number({ required_error: "Medium is required" }),
  large: z.coerce.number({ required_error: "Large is required" }),
  xl: z.coerce.number({ required_error: "XL is required" }),
  xxl: z.coerce.number({ required_error: "XXL is required" }),
});

export const fetchAllProducts = async () => {
  try {
    const products = await prisma.products.findMany({
      include: {
        category: true,
        inventory: true,
      },
    });
    return products;
  } catch (error) {
    return error;
  }
};

export const fetchProductById = async (id: number) => {
  unstable_noStore()
  try {
    const product = await prisma.products.findUnique({
      where: {
        id: id,
      },
      include: {
        category: true,
        inventory: true,
      },
    });
    return product;
  } catch (error) {
    console.log("error getting product", error);
    throw new Error("Error getting product");
  }
};

export async function createProduct(formData: FormData) {
  // this may not work as expected
  const validatedData = FormSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    image: formData.getAll("image"),
    category: formData.get("category"),
    xs: formData.get("xs"),
    small: formData.get("small"),
    medium: formData.get("medium"),
    large: formData.get("large"),
    xl: formData.get("xl"),
    xxl: formData.get("xxl"),
  });

  // console.log("validation step", formData.getAll("image"));

  if (!validatedData.success) {
    console.log(
      validatedData.error.flatten().fieldErrors,
      formData.getAll("image")
    );
    return {
      error: validatedData.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  //prepare data for insertion
  const data = {
    name: validatedData.data.name,
    price: validatedData.data.price,
    description: validatedData.data.description,
    category: validatedData.data.category,
    image: validatedData.data.image,
    xs: validatedData.data.xs,
    small: validatedData.data.small,
    medium: validatedData.data.medium,
    large: validatedData.data.large,
    xl: validatedData.data.xl,
    xxl: validatedData.data.xxl,
  };

  // console.log("data", data.image)

  //upload images and get urls
  const imageUrls = await uploadProductImagesAndReturnUrls(data.image);

  const priceInCents = data.price * 100;

  try {
    const product = await prisma.products.create({
      data: {
        name: data.name,
        priceInCents: priceInCents,
        description: data.description,
        category: {
          connectOrCreate: {
            where: { name: data.category },
            create: { name: data.category },
          },
        },
        images: imageUrls,
        inventory: {
          create: {
            xs_quantity: data.xs,
            s_quantity: data.small,
            m_quantity: data.medium,
            l_quantity: data.large,
            xl_quantity: data.xl,
            xxl_quantity: data.xxl,
          },
        },
      },
      include: {
        category: true,
        inventory: true,
      },
    });
    console.log(product);
  } catch (error) {
    return { message: error };
  }

  revalidatePath("/dashboard/products");
  revalidatePath("/shop");
  redirect("/dashboard/products");
}
