import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3";

const REGION = process.env.AWS_REGION;
const ACCESS_KEY = process.env.S3_ACCESS_KEY || '';
const SECRET_KEY = process.env.S3_SECRET_KEY || '';

export const s3Client = new S3Client({
    region: REGION,
    credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY } as S3ClientConfig['credentials'],
});
