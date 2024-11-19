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

    // File checking like we will check that the file which user is uploading is actually a PDF file or not
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Please upload a valid PDF file." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const originalFileName = file.name.split(".").slice(0, -1).join(".");
    const publicId = `cv_uploads/${originalFileName}`; //   public ID for the uploaded file

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          resource_type: "raw",
          public_id: publicId,
          format: "pdf",
          overwrite: true,
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
      originalFileName: file.name,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file. Please try again." },
      { status: 500 }
    );
  }
}
