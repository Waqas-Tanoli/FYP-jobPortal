{
  /*
// app/api/uploadCV.js

import cloudinary from "cloudinary";
import { NextResponse } from "next/server";

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function POST(req) {
  try {
    console.log("Received request");

    const data = await req.formData();
    const file = data.get("cv");

    if (!file) {
      return NextResponse.json({ error: "No file selected" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Please upload a valid PDF file." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "cv_uploads",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({
      message: "File uploaded successfully",
      url: uploadResult.secure_url,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to upload file. Please try again." },
      { status: 500 }
    );
  }
}
*/
}

// Import cloudinary and other necessary packages
import cloudinary from "cloudinary";
import { NextResponse } from "next/server";

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function POST(req) {
  try {
    console.log("Received request");

    const data = await req.formData();
    const file = data.get("cv");

    if (!file) {
      return NextResponse.json({ error: "No file selected" }, { status: 400 });
    }

    // Ensure the file is a valid PDF
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Please upload a valid PDF file." },
        { status: 400 }
      );
    }

    // Read the file into a buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Define a custom public ID based on the original file name (removing extension)
    const originalFileName = file.name.split(".").slice(0, -1).join("."); // Get the name without the extension
    const publicId = `cv_uploads/${originalFileName}`; // Define a public ID for the uploaded file

    // Upload to Cloudinary with specified public_id
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          resource_type: "raw",
          public_id: publicId, // Use the custom public ID
          format: "pdf", // Specify the format
          overwrite: true, // Optional: overwrite existing files with the same public_id
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer); // End the stream with the buffer
    });

    return NextResponse.json({
      message: "File uploaded successfully",
      url: uploadResult.secure_url, // This is the URL you will use in your frontend
      originalFileName: file.name, // Return the original file name
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file. Please try again." },
      { status: 500 }
    );
  }
}
