"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { updateUserProfile, getUserProfile } from "@/app/api/profile";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [Company, setCompany] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [currentUsername, setCurrentUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          router.push("/Login");
          return;
        }

        const userId = Cookies.get("userId");
        if (!userId) {
          throw new Error("No userId found in cookies.");
        }

        const profileData = await getUserProfile(userId);

        if (profileData) {
          setUsername(profileData.username || "");
          setEmail(profileData.email || "");
          setCompany(profileData.Company || "");
          setCurrentUsername(profileData.username || "");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Error fetching profile");
        toast.error("Failed to fetch profile. Please try again.");
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userId = Cookies.get("userId");
      if (!userId) {
        throw new Error("No userId found in cookies.");
      }

      const formData = new FormData();
      if (username) formData.append("username", username);
      if (email) formData.append("email", email);
      if (Company) formData.append("Company", Company);
      if (profilePicture) formData.append("profilePicture", profilePicture); // Add profile picture

      const response = await updateUserProfile(userId, formData);
      console.log("Profile update response:", response);

      toast.success("Profile updated successfully!");
      router.push("/Dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Error updating profile");
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h2>
        <p className="text-lg font-medium text-gray-700 mb-4">
          Editing profile for:{" "}
          <span className="font-semibold">{currentUsername}</span>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your username"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>

          {/* Company Input */}
          <div className="mb-4">
            <label
              htmlFor="Company"
              className="block text-sm font-medium text-gray-700"
            >
              Company
            </label>
            <input
              type="text"
              id="Company"
              value={Company}
              onChange={(e) => setCompany(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your company name"
            />
          </div>

          {/* Profile Picture Input */}
          <div className="mb-4">
            <label
              htmlFor="profilePicture"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-gray-100 hover:file:bg-gray-200"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
