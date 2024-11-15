"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import { Menu } from "@headlessui/react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getUserProfile } from "@/app/api/profile";
import { logout } from "@/app/api/auth";

const CompanyProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

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
          console.log("Company Profile", profile);
        } else {
          setError("No user data found.");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to fetch user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg text-gray-700">No profile found.</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully.");
    router.push("/Login");
  };

  const handleUpdateProfile = () => {
    router.push("/EditProfile");
  };

  const handlePostJob = () => {
    router.push("/JobEntry");
  };

  const handleViewPostedJobs = () => {
    router.push("/Jobs");
  };

  const handleViewCandidates = () => {
    router.push("/view-candidates");
  };

  return (
    <div className="relative flex items-center space-x-3">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className="flex items-center space-x-2 px-4 py-2 text-gray-800 rounded-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none">
              <Image
                src={
                  user.attributes?.profilePicture?.data?.attributes?.url ||
                  "/default.jpeg"
                }
                alt={user.username}
                width={40}
                height={40}
                className="rounded-full border border-gray-300 object-cover"
              />
              <span className="font-semibold text-lg">{user.username}</span>
              <MdKeyboardArrowDown className="w-5 h-5 text-gray-500" />
            </Menu.Button>

            <Menu.Items className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-20">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handlePostJob}
                    className={`block px-4 py-2 text-base ${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    } transition-colors duration-200`}
                  >
                    Post a Job
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleViewPostedJobs}
                    className={`block px-4 py-2 text-base ${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    } transition-colors duration-200`}
                  >
                    View Posted Jobs
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleViewCandidates}
                    className={`block px-4 py-2 text-base ${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    } transition-colors duration-200`}
                  >
                    View Candidates
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleUpdateProfile}
                    className={`block px-4 py-2 text-base ${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    } transition-colors duration-200`}
                  >
                    Update Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`block px-4 py-2 text-base text-red-600 ${
                      active ? "bg-gray-100 text-gray-900" : ""
                    } transition-colors duration-200`}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  );
};

export default CompanyProfile;
