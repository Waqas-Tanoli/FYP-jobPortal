import cloudinary from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function POST(req) {
  try {
    console.log("Received request");

    const data = await req.formData();
    console.log("Form data:", data);

    const file = data.get("cv");
    if (!file) {
      console.log("No file selected");
      return NextResponse.json({ error: "No file selected" }, { status: 400 });
    }

    console.log("File received:", file.name);

    // Convert file into a buffer to upload to Cloudinary
    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("File buffer created");

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

    console.log("Upload successful:", uploadResult);

    return NextResponse.json({
      message: "File uploaded successfully",
      url: uploadResult.secure_url,
    });
  } catch (error) {
    console.error("Error during file upload:", error);
    return NextResponse.json(
      { error: "Failed to upload file. Please try again." },
      { status: 500 }
    );
  }
}
