'use server';

import { v2 as cloudinary } from "cloudinary";
import uniqid from "uniqid";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file uploaded");

  const ext = file.name.split(".").pop();
  const newFilename = `${uniqid()}.${ext}`;

  // Convert File to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "uploads",
        public_id: newFilename,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            newFilename,
            ext,
            url: result?.secure_url,
          });
        }
      }
    );

    uploadStream.end(buffer);
  });
}
