"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [error, setError] = useState("");
  const router = useRouter();

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
            Update Profile
          </button>
          <button
            onClick={handleAddJobEntry}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Job Entry
          </button>
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
