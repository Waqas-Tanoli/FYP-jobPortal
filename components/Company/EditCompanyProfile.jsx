"use client";

import axiosClient from "@/app/_utils/axiosClient";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

const EditCompanyProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    Company: "",
    location: "",
    slogan: "",
    website: "",
    description: "",
  });

  const [logo, setLogo] = useState(null);
  const [currentLogo, setCurrentLogo] = useState(null);
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
          location: user.location || "",
          slogan: user.slogan || "",
          website: user.website || "",
          description: user.description || "",
        });

        setCurrentLogo(user.logo ? user.logo.url : null);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to fetch profile. Please try again.");
        router.push("/Login");
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedImage = null;
      if (logo) {
        const form = new FormData();
        form.append("files", logo);
        const uploadRes = await axiosClient.post("/upload", form);
        uploadedImage = uploadRes.data[0];
      }

      const userId = Cookies.get("userId");
      if (!userId) {
        throw new Error("No userId found in cookies.");
      }

      const updateRes = await axiosClient.put(`/users/${userId}`, {
        ...formData,
        logo: uploadedImage ? uploadedImage.id : null,
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#A96EFF] to-[#5932A7] p-6">
      <div className="w-full max-w-2xl bg-[#F5E8FF] rounded-lg shadow-xl p-8 border border-[#A96EFF]">
        <h2 className="text-4xl font-bold text-center mb-8 text-[#5932A7]">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            {
              id: "username",
              label: "Username",
              placeholder: "Enter your username",
            },
            {
              id: "Company",
              label: "Company Name",
              placeholder: "Your company's name",
            },
            {
              id: "email",
              label: "Email Address",
              type: "email",
              placeholder: "Your email",
            },
            {
              id: "location",
              label: "location",
              placeholder: "Enter your location",
            },
            {
              id: "slogan",
              label: "slogan",
              placeholder: "Enter your slogan",
            },
            {
              id: "website",
              label: "website",
              placeholder: "e.g., https://website.com",
            },
            {
              id: "description",
              label: "description",
              placeholder: "Enter your description",
            },
          ].map((field) => (
            <div className="flex flex-col" key={field.id}>
              <label
                htmlFor={field.id}
                className="text-sm font-medium text-[#3E2069] mb-1"
              >
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type || "text"}
                name={field.id}
                placeholder={field.placeholder}
                className="p-3 border-2 border-[#A96EFF] rounded-lg bg-white text-[#3E2069] placeholder-[#B68AC5] focus:ring-2 focus:ring-[#A96EFF] focus:outline-none"
                value={formData[field.id]}
                onChange={handleChange}
                required={field.id !== "Company" && field.id !== "Address"}
              />
            </div>
          ))}

          <div>
            <label
              htmlFor="logo"
              className="text-sm font-medium text-[#3E2069] mb-1"
            >
              Logo
            </label>
            {currentLogo && (
              <div className="mb-4">
                <Image
                  width={80}
                  height={80}
                  src={currentLogo}
                  alt="Current  Logo"
                  className="w-20 h-20 object-cover rounded-full"
                />
              </div>
            )}
            <input
              type="file"
              name="logo"
              id="logo"
              onChange={handleFileChange}
              accept="image/*"
              className="block w-full p-2 border-2 border-[#A96EFF] rounded-lg bg-[#EFE7FF] text-[#3E2069]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-[#A96EFF] to-[#7B4FA2] text-white font-semibold shadow-lg hover:opacity-90 focus:ring-4 focus:ring-[#A96EFF] focus:outline-none"
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

export default EditCompanyProfile;
