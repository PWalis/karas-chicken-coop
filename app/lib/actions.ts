"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import prisma from "./data";
import {
  uploadProductImagesAndReturnUrls,
  deleteFile,
  getPresignedUrl,
  uploadImageAndReturnUrl,
} from "./S3Controller";
import { redirect } from "next/navigation";
import {
  parseDateString,
  expiryStringToInt,
  getSignedURLImageName,
} from "./utils";
import { unstable_noStore as noStore } from "next/cache";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 30; //30MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/HIEC"];

type updateBindData = {
  productId: number;
  images: string[];
  primaryImage: string;
};

const ImageSchema = z
  .instanceof(File)
  .optional()
  .refine((file) => {
    return file!.size <= MAX_UPLOAD_SIZE;
  }, "File size must be less than 30MB")

// this object will be used to validate the form data
const FormSchema = z.object({
  name: z.string().min(1, { message: "Name Required" }),
  price: z.coerce
    .number()
    .min(1, { message: "Price must be at least 1 dollar" }),
  description: z.string().min(1, { message: "Description required" }),
  primaryImage: z.array(ImageSchema).nonempty({ message: "Image is required" }),
  image: z.array(ImageSchema).nonempty({ message: "Image is required" }),
  category: z.string().nullable(),
  newCategory: z.string().nullable(),
  quantity: z.coerce
    .number()
    .min(0, { message: "Quantity must be at least 0" }),
  size: z.coerce.boolean(),
  xs: z.coerce.number().nullable(),
  small: z.coerce.number().nullable(),
  medium: z.coerce.number().nullable(),
  large: z.coerce.number().nullable(),
  xl: z.coerce.number().nullable(),
  xxl: z.coerce.number().nullable(),
});

const ItemOrderSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
  size: z.string(),
  price: z.number(),
});

const CartSchema = z.object({
  itemOrder: z.array(ItemOrderSchema).nonempty(),
  name: z.string(),
  address: z.string(),
  state: z.string(),
  zip: z.string(),
  email: z.string(),
});

export const fetchProductPrices = async (productId: number) => {
  noStore();
  try {
    const price = await prisma.products.findUnique({
      where: {
        id: productId,
      },
      select: {
        priceInCents: true,
      },
    });
    return price;
  } catch (error) {
    console.log("error getting product prices ", error);
  }
};

interface productAndQuantity {
  productId: number;
  quantity: number;
}

export const fetchProductsTotal = async (products: productAndQuantity[]) => {
  noStore();
  try {
    let total = 0;
    for (let product of products) {
      const price = (await fetchProductPrices(product.productId)) as any;
      total = total + price.priceInCents * product.quantity;
    }
    return total;
  } catch (error) {
    console.log("error getting products total ", error);
  }
};

export const fetchAllProducts = async () => {
  noStore();
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
          } catch (error) {
            return { message: error };
          }
        }
      }
    }
    return products;
  } catch (error) {
    console.log("Error fetching products ", error);
  }
};

export const fetchProductById = async (id: number) => {
  noStore();
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
    console.log("error getting product ", error);
    throw new Error("Error getting product");
  }
};

export const fetchProductsIdArray = async (productIds: number[]) => {
  noStore();
  try {
    const products = await prisma.products.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });
    return products;
  } catch (error) {
    console.log("error getting products ", error);
  }
};

export type createProductState = {
  error?: {
    name?: string[];
    price?: string[];
    description?: string[];
    primaryImage?: string[];
    image?: string[];
    category?: string[];
    newCategory?: string[];
    quantity?: string[];
    xs?: string[];
    small?: string[];
    medium?: string[];
    large?: string[];
    xl?: string[];
    xxl?: string[];
  };
  message?: string | null;
  size?: boolean;
};

export async function createProduct(
  currentState: createProductState | any,
  formData: FormData
) {
  noStore();
  const validatedData = FormSchema.refine(
    (data) => data.newCategory || data.category,
    {
      message: "Category or New Category is required",
      path: ["newCategory", "category"],
    }
  ).safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    primaryImage: formData.getAll("primaryImage"),
    image: formData.getAll("image"),
    category: formData.get("category"),
    newCategory: formData.get("newCategory"),
    quantity: formData.get("quantity"),
    size: formData.get("size"),
    xs: formData.get("xs"),
    small: formData.get("small"),
    medium: formData.get("medium"),
    large: formData.get("large"),
    xl: formData.get("xl"),
    xxl: formData.get("xxl"),
  });

  if (!validatedData.success) {
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
    primaryImage: validatedData.data.primaryImage,
    image: validatedData.data.image,
    size: validatedData.data.size,
    quantity: validatedData.data.quantity,
    xs: validatedData.data.xs,
    small: validatedData.data.small,
    medium: validatedData.data.medium,
    large: validatedData.data.large,
    xl: validatedData.data.xl,
    xxl: validatedData.data.xxl,
  };

  //upload images and get urls
  const imageUrls = await uploadProductImagesAndReturnUrls(data.image);
  const primaryImageUrl = await uploadProductImagesAndReturnUrls(
    data.primaryImage
  );

  const priceInCents = data.price * 100;

  try {
    const product = await prisma.products.create({
      data: {
        name: data.name,
        priceInCents: priceInCents,
        description: data.description,
        category: {
          connectOrCreate: {
            where: { name: data.category! },
            create: { name: data.category! },
          },
        },
        primaryImage: primaryImageUrl[0],
        images: imageUrls,
        inventory: {
          create: {
            hasSizes: data.size ?? false,
            quantity: data.quantity ?? 0,
            xs_quantity: data.xs != null ? data.xs : 0,
            s_quantity: data.small != null ? data.small : 0,
            m_quantity: data.medium != null ? data.medium : 0,
            l_quantity: data.large != null ? data.large : 0,
            xl_quantity: data.xl != null ? data.xl : 0,
            xxl_quantity: data.xxl != null ? data.xxl : 0,
          },
        },
      },
      include: {
        category: true,
        inventory: true,
      },
    });
  } catch (error) {
    return { message: "error creating product" };
  }

  revalidatePath("/");
  redirect("/dashboard/products");
}

export async function deleteImage(imageName: string, productId: number) {
  noStore();
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

  try {
    await deleteFile(imageName);
  } catch (error) {
    return { message: error };
  }
  revalidatePath("/");
}

export async function deleteProduct(productId: number) {
  noStore();
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
    console.log("Error deleting product", error);
  }
  revalidatePath("/");
}

type updateProductState = {
  error?: {
    name?: string[],
    price?:  string[],
    description?: string[],
  },
  message?: string,
  primaryImageState?: any,
  imagesState?: any,
  productId?: number
}

export async function updateProduct(
  currentState: updateProductState,
  formData: FormData
) {
  noStore();
  const FormSchemaNoImageRequired = FormSchema.omit({
    image: true,
    primaryImage: true,
  });
  // console.log("product id, images and primary image in state", currentState.imagesState, currentState.primaryImageState, currentState.productId)

  const validatedData = FormSchemaNoImageRequired.refine(
    (data) => data.newCategory || data.category,
    {
      message: "Category or New Category is required",
      path: ["newCategory", "category"],
    }
  ).safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    category: formData.get("category"),
    newCategory: formData.get("newCategory"),
    quantity: formData.get("quantity"),
    xs: formData.get("xs"),
    small: formData.get("small"),
    medium: formData.get("medium"),
    large: formData.get("large"),
    xl: formData.get("xl"),
    xxl: formData.get("xxl"),
  });

  if (!validatedData.success) {
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
    primaryImage: formData.get("primaryImage") as any,
    image: formData.getAll("image") as any,
    quantity: validatedData.data.quantity ?? 0,
    xs: validatedData.data.xs,
    small: validatedData.data.small,
    medium: validatedData.data.medium,
    large: validatedData.data.large,
    xl: validatedData.data.xl,
    xxl: validatedData.data.xxl,
  };

  if (data.image[0].size != 0) {
    const imageUrls = await uploadProductImagesAndReturnUrls(data.image);
    currentState.imagesState = currentState.imagesState.concat(imageUrls);
  }

  if (data.primaryImage.size != 0) {
    const primaryImageUrl = await uploadImageAndReturnUrl(data.primaryImage);
    currentState.primaryImageState = primaryImageUrl;
  }

  const priceInCents = data.price * 100;

  try {
    const product = await prisma.products.update({
      where: {
        id: currentState.productId,
      },
      data: {
        name: data.name,
        priceInCents: priceInCents,
        description: data.description,
        category: {
          connectOrCreate: {
            where: { name: data.category! },
            create: { name: data.category! },
          },
        },
        primaryImage: currentState.primaryImageState,
        images: currentState.imagesState,
        inventory: {
          update: {
            data: {
              quantity: data.quantity!,
              xs_quantity: data.xs != null ? data.xs : 0,
              s_quantity: data.small != null ? data.small : 0,
              m_quantity: data.medium != null ? data.medium : 0,
              l_quantity: data.large != null ? data.large : 0,
              xl_quantity: data.xl != null ? data.xl : 0,
              xxl_quantity: data.xxl != null ? data.xxl : 0,
            },
          },
        },
      },
      include: {
        category: true,
        inventory: true,
      },
    });
  } catch (error) {
    console.log("error updating product", error);
  }

  revalidatePath("/");
  redirect("/dashboard/products");
}

export async function fetchCategories() {
  noStore();
  try {
    const categories = await prisma.categories.findMany();
    return categories;
  } catch (error) {
    return { message: error };
  }
}

export async function createOrder(
  address: any,
  cart: any,
  paymentIntentId: string
) {
  noStore();
  //create order
  try {
    const order = await prisma.order.create({
      data: {
        name: address.name,
        address: address.address.line1 + ", " + (address.address.line2 ?? ""),
        city: address.address.city,
        state: address.address.state,
        zip: address.address.postal_code,
        paymentIntentId: paymentIntentId,
        orderItems: {
          create: cart.items.map((item: any) => {
            if (item.size != undefined || item.size != null) {
              return {
                quantity: item.quantity,
                size: item.size,
                hasSizes: true,
                productId: item.id,
              };
            } else {
              return {
                quantity: item.quantity,
                hasSizes: false,
                size: "none",
                productId: item.id,
              };
            }
          }),
        },
      },
    });
    return order;
  } catch (error) {
    console.log("Error creating order", error);
  }
}

type OrderStatus =
  | "PENDING"
  | "PAID"
  | "PROCESSED"
  | "FULFILLED"
  | "CANCELED"
  | "DELIVERED";

export async function setOrderStatus(orderId: string, status: OrderStatus) {
  noStore();
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: status,
      },
    });
    return order.status;
  } catch (error) {
    console.log("Error setting order status", error);
  }
  revalidatePath("/dashboard/orders", "page");
}

export async function fetchOrderById(id: string) {
  noStore();
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: id,
      },
      include: {
        orderItems: {},
      },
    });
    return order;
  } catch (error) {
    console.log("Error fetching order", error);
  }
}

export async function fetchAllProcessedOrders() {
  noStore();
  try {
    const orders = await prisma.order.findMany({
      where: {
        status: "PROCESSED",
      },
      include: {
        orderItems: {},
      },
    });
    return orders;
  } catch (error) {
    console.log("Error fetching orders", error);
  }
}

export async function fetchAllFulfilledOrders() {
  noStore();
  try {
    const orders = await prisma.order.findMany({
      where: {
        status: "FULFILLED",
      },
      include: {
        orderItems: {},
      },
    });
    return orders;
  } catch (error) {
    console.log("Error fetching orders", error);
  }
}

async function setSizeInventory(
  productId: number,
  size: string,
  quantity: number
) {
  noStore();
  try {
    await prisma.inventory.update({
      where: {
        productId: productId,
      },
      data: {
        [size]: quantity,
      },
    });
  } catch (error) {
    console.log("Error setting inventory", error);
  }
}

async function setInventory(productId: number, quantity: number) {
  noStore();
  try {
    await prisma.inventory.update({
      where: {
        productId: productId,
      },
      data: {
        quantity: quantity,
      },
    });
  } catch (error) {
    console.log("Error setting inventory", error);
  }
}

export async function processOrder(orderId: string) {
  noStore();
  return prisma.$transaction(async (prisma) => {
    const fetchedOrder = await fetchOrderById(orderId);
    if (fetchedOrder!.status != "PAID") {
      return { message: "Order not paid" };
    }

    try {
      for (let item of fetchedOrder!.orderItems) {
        if (item.hasSizes) {
          const inventory = await prisma.inventory.findUnique({
            where: {
              productId: item.productId,
            },
          });
          if (item.size == "XS") {
            const newInventory = inventory!.xs_quantity - item.quantity;
            if (newInventory < 0) {
              throw new Error("Inventory cannot be less than 0");
            }
            await setSizeInventory(item.productId, "xs_quantity", newInventory);
          } else if (item.size == "S") {
            const newInventory = inventory!.s_quantity - item.quantity;
            if (newInventory < 0) {
              throw new Error("Inventory cannot be less than 0");
            }
            await setSizeInventory(item.productId, "s_quantity", newInventory);
          } else if (item.size == "M") {
            const newInventory = inventory!.m_quantity - item.quantity;
            if (newInventory < 0) {
              throw new Error("Inventory cannot be less than 0");
            }
            await setSizeInventory(item.productId, "m_quantity", newInventory);
          } else if (item.size == "L") {
            const newInventory = inventory!.l_quantity - item.quantity;
            if (newInventory < 0) {
              throw new Error("Inventory cannot be less than 0");
            }
            await setSizeInventory(item.productId, "l_quantity", newInventory);
          } else if (item.size == "XL") {
            const newInventory = inventory!.xl_quantity - item.quantity;
            if (newInventory < 0) {
              throw new Error("Inventory cannot be less than 0");
            }
            await setSizeInventory(item.productId, "xl_quantity", newInventory);
          } else if (item.size == "XXL") {
            const newInventory = inventory!.xxl_quantity - item.quantity;
            if (newInventory < 0) {
              throw new Error("Inventory cannot be less than 0");
            }
            await setSizeInventory(
              item.productId,
              "xxl_quantity",
              newInventory
            );
          }
        } else {
          const inventory = await prisma.inventory.findUnique({
            where: {
              productId: item.productId,
            },
          });
          const newInventory = inventory!.quantity - item.quantity;
          await setInventory(item.productId, newInventory);
        }
      }
      await setOrderStatus(orderId, "PROCESSED");
      revalidatePath("/");
      return fetchedOrder;
    } catch (error) {
      console.log("Error processing order", error);
    }
  });
}

export async function checkInventory(cart: any) {
  noStore();
  try {
    for (let item of cart.items) {
      const inventory = await prisma.inventory.findUnique({
        where: {
          productId: item.id,
        },
      });
      if (item.size != undefined || item.size != null) {
        if (item.size.toLowerCase() == "xs") {
          if (inventory!.xs_quantity < item.quantity) {
            return { message: "Not enough xs inventory" };
          } else if (item.size.toLowerCase() == "s") {
            if (inventory!.s_quantity < item.quantity) {
              return { message: "Not enough s inventory" };
            }
          } else if (item.size.toLowerCase() == "m") {
            if (inventory!.m_quantity < item.quantity) {
              return { message: "Not enough m inventory" };
            }
          } else if (item.size.toLowerCase() == "l") {
            if (inventory!.l_quantity < item.quantity) {
              return { message: "Not enough l inventory" };
            }
          } else if (item.size.toLowerCase() == "xl") {
            if (inventory!.xl_quantity < item.quantity) {
              return { message: "Not enough xl inventory" };
            }
          } else if (item.size.toLowerCase() == "xxl") {
            if (inventory!.xxl_quantity < item.quantity) {
              return { message: "Not enough xxl inventory" };
            }
          }
        }
      } else {
        if (inventory!.quantity < item.quantity) {
          return { message: "There is Not enough inventory" };
        }
      }
    }
    return { message: "There is enough inventory" };
  } catch (error) {
    console.log("Error checking inventory", error);
  }
}
