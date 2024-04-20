"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import prisma from "./data";
import {
  uploadProductImagesAndReturnUrls,
  deleteFile,
  getPresignedUrl,
} from "./S3Controller";
import { redirect } from "next/navigation";
import { unstable_noStore } from "next/cache";
import {
  parseDateString,
  expiryStringToInt,
  getSignedURLImageName,
} from "./utils";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 7; //7MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

type updateBindData = {
  productId: number;
  images: string[];
};

const ImageSchema = z
  .instanceof(File)
  .optional()
  .refine((file) => {
    return !file || file.size <= MAX_UPLOAD_SIZE;
  }, "File size must be less than 7MB")
  .refine((file) => {
    return ACCEPTED_IMAGE_TYPES.includes(file!.type);
  }, "File type must be either jpeg or png");

// this object will be used to validate the form data
const FormSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  price: z.coerce.number({ required_error: "Price is required" }),
  description: z.string({ required_error: "Description is required" }),
  image: z.array(ImageSchema).nonempty({ message: "Image is required" }),
  category: z.string().nullable(),
  newCategory: z.string().nullable(),
  xs: z.coerce.number({ required_error: "XS is required" }),
  small: z.coerce.number({ required_error: "Small is required" }),
  medium: z.coerce.number({ required_error: "Medium is required" }),
  large: z.coerce.number({ required_error: "Large is required" }),
  xl: z.coerce.number({ required_error: "XL is required" }),
  xxl: z.coerce.number({ required_error: "XXL is required" }),
});

export const fetchAllProducts = async () => {
  unstable_noStore();
  try {
    const products = await prisma.products.findMany({
      include: {
        category: true,
        inventory: true,
      },
    });

    //check if image urls are expired and update them if they are
    for (let product of products) {
      // loop through images
      let imageExpired = false;
      let newImageArray = [];

      // loop over images and check if they are expired
      for (let image of product.images) {
        const imageDateAsString = image
          .split("-Amz-")
          .filter((item) => item.includes("Date"))[0]
          .split("=")[1];
        const imageDate = parseDateString(imageDateAsString);
        const imageExpires = image
          .split("-Amz-")
          .filter((item) => item.includes("Expires"))[0]
          .split("=")[1];
        const expiry = expiryStringToInt(imageExpires);
        const expiresAt = imageDate.setSeconds(imageDate.getSeconds() + expiry);

        // get new signed urls for expired images and add them to array of urls
        if (expiresAt < Date.now()) {
          console.log("\nTHIS IMAGE IS EXPIRED", image);
          imageExpired = true;
          const imageName = getSignedURLImageName(image);
          const url = await getPresignedUrl(imageName ?? "");
          newImageArray.push(url);
        } else {
          newImageArray.push(image);
        }

        // if expired update product images with new array of signed urls
        if (imageExpired) {
          try {
            await prisma.products.update({
              where: {
                id: product.id,
              },
              data: {
                images: newImageArray,
              },
            });
            console.log("\nupdated product with new signed urls");
          } catch (error) {
            return { message: error };
          }
        }
      }
    }
    return products;
  } catch (error) {
    return error;
  }
};

export const fetchProductById = async (id: number) => {
  unstable_noStore();
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
  const validatedData = FormSchema.refine(
    (data) => data.newCategory || data.category,
    {
      message: "At least one of newCategory or category is required",
      path: ["newCategory", "category"],
    }
  ).safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    image: formData.getAll("image"),
    category: formData.get("category"),
    newCategory: formData.get("newCategory"),
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
      validatedData.error.flatten().fieldErrors
      // formData.getAll("image")
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
    category: validatedData.data.newCategory
      ? validatedData.data.newCategory
      : validatedData.data.category,
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
            where: { name: data.category!},
            create: { name: data.category!},
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
  revalidatePath("/dashboard/createNewProduct")
  redirect("/dashboard/products");
}

export async function deleteImage(imageName: string, productId: number) {
  //deletes the file from S3 and postgresql db
  try {
    const product = await prisma.products.findUnique({
      where: {
        id: productId,
      },
    });
    const imageArray = product?.images;
    const newImageArray = imageArray?.filter(
      (item) => !item.includes(imageName)
    );

    await prisma.products.update({
      where: {
        id: productId,
      },
      data: {
        images: newImageArray,
      },
    });
  } catch (error) {
    return { message: error };
  }
  console.log("successfully delete image");

  try {
    await deleteFile(imageName);
  } catch (error) {
    return { message: error };
  }
  revalidatePath("/dashboard/products");
}

export async function deleteProduct(productId: number) {
  try {
    const product = await prisma.products.findUnique({
      where: {
        id: productId,
      },
    });

    const images = product?.images;

    for (let image of images!) {
      const imageName = getSignedURLImageName(image);
      await deleteFile(imageName ?? "");
    }

    await prisma.products.delete({
      where: {
        id: productId,
      },
    });
  } catch (error) {
    return { message: error };
  }
  console.log("Product Deleted");
}

export async function updateProduct(
  { productId, images }: updateBindData,
  formData: FormData
) {
  const FormSchemaNoImageRequired = FormSchema.omit({ image: true });

  const validatedData = FormSchemaNoImageRequired.refine(
    (data) => data.newCategory || data.category,
    {
      message: "At least one of newCategory or category is required",
      path: ["newCategory", "category"],
    }
  ).safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    category: formData.get("category"),
    newCategory: formData.get("newCategory"),
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
    category: validatedData.data.newCategory
      ? validatedData.data.newCategory
      : validatedData.data.category,
    image: formData.getAll("image") as any,
    xs: validatedData.data.xs,
    small: validatedData.data.small,
    medium: validatedData.data.medium,
    large: validatedData.data.large,
    xl: validatedData.data.xl,
    xxl: validatedData.data.xxl,
  };

  // console.log("\nimages", data.image[0].size)

  if (data.image[0].size != 0) {
    const imageUrls = await uploadProductImagesAndReturnUrls(data.image);
    images = images.concat(imageUrls);
  }

  const priceInCents = data.price * 100;

  try {
    const product = await prisma.products.update({
      where: {
        id: productId,
      },
      data: {
        name: data.name,
        priceInCents: priceInCents,
        description: data.description,
        category: {
          connectOrCreate: {
            where: { name: data.category!},
            create: { name: data.category! },
          },
        },
        images: images,
        inventory: {
          update: {
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
  revalidatePath("/dashboard/createNewProduct")
  redirect("/dashboard/products");
}

export async function fetchCategories() {
  try {
    const categories = await prisma.categories.findMany();
    return categories;
  } catch (error) {
    return { message: error };
  }
}
