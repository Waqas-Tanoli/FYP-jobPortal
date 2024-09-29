"use client";

import axiosClient from "@/app/_utils/axiosClient";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation"; // Use Next.js router

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    Company: "",
    Address: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [currentProfilePicture, setCurrentProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = Cookies.get("userId");
        if (!userId) {
          throw new Error("No userId found in cookies.");
        }

        const response = await axiosClient.get(`/users/${userId}`);
        const user = response.data;

        setFormData({
          username: user.username || "",
          email: user.email || "",
          Company: user.Company || "",
          Address: user.Address || "",
        });

        setCurrentProfilePicture(
          user.profilePicture ? user.profilePicture.url : null
        );
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to fetch profile. Please try again.");

        router.push("/Login");
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedImage = null;
      if (profilePicture) {
        const form = new FormData();
        form.append("files", profilePicture);
        const uploadRes = await axiosClient.post("/upload", form);
        uploadedImage = uploadRes.data[0];
      }

      const userId = Cookies.get("userId");
      if (!userId) {
        throw new Error("No userId found in cookies.");
      }

      const updateRes = await axiosClient.put(`/users/${userId}`, {
        ...formData,
        profilePicture: uploadedImage ? uploadedImage.id : null,
      });

      toast.success("Profile updated successfully!");

      setCurrentProfilePicture(
        uploadedImage ? uploadedImage.url : currentProfilePicture
      );
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="Company"
              className="block text-sm font-medium text-gray-700"
            >
              Company
            </label>
            <input
              type="text"
              name="Company"
              id="Company"
              placeholder="Enter your company name"
              value={formData.Company}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="Address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              name="Address"
              id="Address"
              placeholder="Enter your address"
              value={formData.Address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="profilePicture"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Picture
            </label>
            {currentProfilePicture && (
              <div className="mb-4">
                <img
                  src={currentProfilePicture}
                  alt="Current Profile Picture"
                  className="w-28 h-28 object-cover rounded-md"
                />
              </div>
            )}
            <input
              type="file"
              name="profilePicture"
              id="profilePicture"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditProfile;
