"use client";

import { useState, useEffect } from "react";
import api from "@/_utils/GlobalApi";
import { toast } from "react-toastify"; // Import toast

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "",
    address: "",
    email: "",
    companyName: "",
    profilePicture: null,
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          const { data } = await api.getUserProfile(storedUser.id);
          setUser(data);
          setProfileData({
            name: data.username,
            address: data.address || "",
            email: data.email,
            companyName: data.companyName || "",
            profilePicture: data.profilePicture || null,
          });
        }
      } catch (error) {
        setError("Failed to load user profile");
        toast.error("Failed to load user profile"); // Add toast notification
      }
    };
    fetchUserProfile();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setProfileData({ ...profileData, [name]: files[0] });
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", profileData.name);
    formData.append("address", profileData.address);
    formData.append("email", profileData.email);
    formData.append("companyName", profileData.companyName);
    if (profileData.profilePicture) {
      formData.append("profilePicture", profileData.profilePicture);
    }

    try {
      await api.updateUserProfile(user.id, formData);
      setMessage("Profile updated successfully");
      toast.success("Profile updated successfully"); // Add toast notification
    } catch (error) {
      setError("Failed to update profile");
      toast.error("Failed to update profile"); // Add toast notification
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
      <form onSubmit={handleProfileSubmit} className="space-y-6 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleProfileChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={profileData.address}
            onChange={handleProfileChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Address"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleProfileChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={profileData.companyName}
            onChange={handleProfileChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Company Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Profile Picture
          </label>
          <input
            type="file"
            name="profilePicture"
            onChange={handleProfileChange}
            className="mt-1 block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
