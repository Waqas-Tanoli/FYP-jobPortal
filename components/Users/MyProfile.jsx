"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

import { getUserProfile } from "@/app/api/profile";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  {
    /*useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("token");
        console.log("Retrieved token for profile fetch:", token); 
        if (token) {
          const userId = 1; 
          const profile = await getUserProfile(userId);
          setUser(profile);
        } else {
          setError("No token found.");
        }
      } catch (err) {
        setError("Failed to fetch user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); */
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No profile found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      <img
        src={user.profilePicture || "/default-profile.png"}
        alt={user.username}
        className="w-24 h-24 rounded-full border border-gray-300 object-cover"
      />
      <div className="text-center">
        <p className="font-semibold text-xl text-gray-800">{user.username}</p>
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-600">
          {user.companyName || "Company not set"}
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <Link href="/auth/edit-profile">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              Edit Profile
            </button>
          </Link>
          <Link href="/auth/upload-cv">
            <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
              Upload CV
            </button>
          </Link>
          <Link href="/auth/view-applied-jobs">
            <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
              View Applied Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
