"use client";

import { useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadCV() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setError("");
    } else {
      setError("Please upload a PDF file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("files", selectedFile);

    setIsSubmitting(true);

    try {
      const token = Cookies.get("token");

      if (!token) {
        setError("Authorization token is missing. Please log in again.");
        return;
      }

      const res = await fetch("http://localhost:1337/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("CV uploaded successfully!");
        const completeUrl = new URL(data[0].url, "http://localhost:1337").href;
        setUploadedUrl(completeUrl);
        setSelectedFile(null);
      } else {
        setError(
          data.error?.message || "Failed to upload CV. Please try again."
        );
      }
    } catch (error) {
      console.error("Upload error:", error); // Log the error for debugging
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Upload Your CV
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="cv">
              Select PDF File
            </label>
            <input
              type="file"
              id="cv"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 transition duration-300 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Uploading..." : "Upload CV"}
            </button>
          </div>
        </form>

        {uploadedUrl && (
          <div className="mt-4">
            <p className="text-green-600">File uploaded:</p>
            <div className="mt-4">
              <a
                href={uploadedUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="CV.pdf"
                className="inline-block px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 transition duration-300"
              >
                Download CV
              </a>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
