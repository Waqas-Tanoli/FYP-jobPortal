"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { getUserProfile } from "@/app/api/profile";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useRouter } from "next/navigation";
import { logout } from "@/app/api/auth";
import Image from "next/image";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentProfilePicture, setCurrentProfilePicture] = useState("");
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

          if (profile.profilePicture) {
            setCurrentProfilePicture(profile.profilePicture.url || "");
          }
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
    router.push("/Login");
    logout();
  };
  const handleUpdateProfile = () => {
    router.push("/EditProfile");
  };

  const handleFindJobs = () => {
    router.push("/Jobs");
  };

  const handleCvUpload = () => {
    router.push("/Upload-CV");
  };

  return (
    <div className="relative flex items-center space-x-3">
      <Menu>
        <MenuButton className="flex items-center space-x-2 px-4 py-2 text-gray-800 rounded-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none">
          <Image
            src={currentProfilePicture || "/default.jpeg"}
            alt={user.username}
            width={40}
            height={40}
            className="rounded-full border border-gray-300"
          />
          <span className="font-semibold text-lg">{user.username}</span>
          <MdKeyboardArrowDown className="w-5 h-5 text-gray-500" />
        </MenuButton>

        <MenuItems className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-20">
          <MenuItem>
            {({ active }) => (
              <button
                onClick={handleUpdateProfile}
                className={`block px-4 py-2 text-base ${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                } transition-colors duration-200`}
              >
                Edit Profile
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <button
                onClick={handleCvUpload}
                className={`block px-4 py-2 text-base ${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                } transition-colors duration-200`}
              >
                Upload CV
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <Link
                href="/applied_jobs"
                className={`block px-4 py-2 text-base ${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                } transition-colors duration-200`}
              >
                View Applied Jobs
              </Link>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <button
                onClick={handleFindJobs}
                className={`block px-4 py-2 text-base ${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                } transition-colors duration-200`}
              >
                Search Jobs
              </button>
            )}
          </MenuItem>
          <MenuItem>
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
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default MyProfile;
