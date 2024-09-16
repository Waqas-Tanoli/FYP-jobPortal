"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { getUserProfile } from "@/app/api/profile";

const Dashboard = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("token");
        const userData = Cookies.get("user");

        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          const userId = parsedUser.userId;

          const profile = await getUserProfile(userId);
          setUser(profile);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    router.push("/Login");
    toast.success("Logged out successfully.");
  };

  const handleUpdateProfile = () => {
    router.push("/EditProfile");
  };

  const handleAddJobEntry = () => {
    router.push("/JobEntry");
  };

  //const isCompany = Cookies.get("userType");

  //console.log("Company: ", isCompany);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Welcome to the Dashboard
        </h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="space-y-4">
          <button
            onClick={handleUpdateProfile}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Update
          </button>

          {user?.isCompany == true && (
            <button
              onClick={handleAddJobEntry}
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Job Entry for job Seekers
            </button>
          )}
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
