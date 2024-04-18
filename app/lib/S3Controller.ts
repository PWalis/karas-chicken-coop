"use server";

import * as crypto from "crypto-js";
import sharp from "sharp";
import { s3Client } from "./S3Connection";
import {
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Buffer } from "buffer";

export const hashFilename = (filename: string): string => {
  const saltedFilename = filename + crypto.lib.WordArray.random(128 / 8);
  return crypto.SHA256(saltedFilename).toString();
};

const resizeImage = (
  buffer: Buffer,
  width: number,
  height: number
): Promise<Buffer | void> => {
  const resizedImage = sharp(buffer)
    .resize(width, height)
    .toBuffer()
    .then((data) => {
      console.log("Successfully resized image.");
      return data;
    })
    .catch((err) => {
      console.log("Error resizing image.", err);
    });
  return resizedImage;
};

export const uploadFile = async (file: any, filename: string) => {
  // console.log("uploading file", file, filename);
  const buffer = (await file.arrayBuffer()) as Buffer;
  const resizedImage = await resizeImage(buffer, 600, 600);
  // console.log("resized image", resizedImage)
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
    Body: resizedImage as Buffer, // Cast resizedImage to Buffer
    ContentType: file.type,
  };
  await s3Client
    .send(new PutObjectCommand(params))
    .then((data: any) => {
      console.log("Successfully uploaded file.");
    })
    .catch((error: any) => {
      console.log("Error uploading file.", error, params);
    });
};

//get presigned url
export const getPresignedUrl = async (
  fileName: string,
) => {
  console.log("getting presigned url");
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
  };
  const command = new GetObjectCommand(params);
  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 604800,
  });
  return signedUrl;
};

// delete file from s3
export const deleteFile = async (fileName: string) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
  };
  await s3Client
    .send(new DeleteObjectCommand(params))
    .then((data: any) => {
      console.log("Successfully deleted file.", data);
      return data;
    })
    .catch((error: any) => {
      console.log("Error deleting file.", error);
    });
};

export const uploadImageAndReturnUrl = async (file: any) => {
  const filename = await hashFilename(file.name);
  console.log("\nuploading image and returning url", file, filename);
  await uploadFile(file, filename);
  const url = await getPresignedUrl(filename);
  return url;
};

export const uploadProductImagesAndReturnUrls = async (files: any) => {
  const urls = [];
  for (const file of files) {
    const url = await uploadImageAndReturnUrl(file);
    urls.push(url);
  }
  return urls;
  // console.log(files);
};
