"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
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
  const [cvUrl, setCvUrl] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
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
          console.log("User Profile:", profile);
          setUser(profile);

          if (profile.profilePicture) {
            setCurrentProfilePicture(profile.profilePicture.url || "");
          }

          // Check how cvUrl is structured in the profile object
          if (profile.cvUrl) {
            setCvUrl(
              typeof profile.cvUrl === "string"
                ? profile.cvUrl
                : profile.cvUrl.url || ""
            );
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
    logout();
    router.push("/Login");
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

  const handleDownloadCV = () => {
    if (cvUrl) {
      setShowConfirmation(true);
    } else {
      alert("No CV uploaded yet.");
    }
  };

  const confirmDownload = () => {
    if (cvUrl) {
      const link = document.createElement("a");
      link.href = cvUrl;
      link.download = "CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setShowConfirmation(false);
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
          {[
            { label: "Edit Profile", action: handleUpdateProfile },
            { label: "Upload CV", action: handleCvUpload },
            {
              label: "View Applied Jobs",
              action: () => router.push("/applied_jobs"),
            },
            { label: "Search Jobs", action: handleFindJobs },
            { label: "Download CV", action: handleDownloadCV },
            { label: "Logout", action: handleLogout, isLogout: true },
          ].map((item) => (
            <MenuItem key={item.label}>
              {({ active }) => (
                <button
                  onClick={item.action}
                  className={`block w-full text-left px-4 py-2 text-base ${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } transition-colors duration-200 rounded-lg`}
                >
                  {item.isLogout ? (
                    <span className="text-red-600">{item.label}</span>
                  ) : (
                    item.label
                  )}
                </button>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-30 backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Download</h3>
            <p>Are you sure you want to download your CV?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="mr-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDownload}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Download Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
