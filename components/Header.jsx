"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import MyProfile from "@/components/Users/MyProfile";
import CompanyProfile from "./Company/CompanyProfile";
import { getUserProfile } from "@/app/api/profile";
import ClipLoader from "react-spinners/ClipLoader";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCompany, setIsCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = Cookies.get("token");

      if (token) {
        setIsLoggedIn(true);

        try {
          const userData = Cookies.get("user");
          if (userData) {
            const parsedUser = JSON.parse(userData);
            const profile = await getUserProfile(parsedUser.userId);
            setIsCompany(profile.isCompany);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoggedIn(false);
        setIsCompany(null);
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const Menu = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Find Jobs", path: "/Jobs" },
    { id: 4, name: "How Job Portal Works", path: "/how-it-works" },
  ];

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  if (isLoading) {
    // loading spinner while checking token or after login form submission
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <ClipLoader color={"#4F46E5"} size={50} />{" "}
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between mt-2 p-4 md:p-5 shadow-current bg-white">
      <div className="flex items-center gap-4 md:gap-10">
        {/* Mobile Menu Icon (only visible on small screens) */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <i className={`fas fa-${menuOpen ? "times" : "bars"} text-2xl`}></i>
          </button>
        </div>

        {/* Menu always displayed on medium and larger screens */}
        <ul className={`hidden md:flex gap-8`}>
          {Menu.map((item) => (
            <li
              key={item.id}
              className="font-semibold hover:text-[#040c1b] cursor-pointer hover:scale-105 transition-all ease-in-out"
            >
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>

        {/* Hamburger Menu for Small Screens */}
        {menuOpen && (
          <ul className="absolute top-16 left-0 right-0 bg-white shadow-lg p-4 flex flex-col gap-2 md:hidden">
            {Menu.map((item) => (
              <li key={item.id}>
                <Link href={item.path}>
                  <span className="block p-2 text-center font-semibold hover:text-[#040c1b] cursor-pointer hover:scale-105 transition-all ease-in-out text-sm">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={toggleMenu}
                className="text-red-600 font-semibold text-sm"
              >
                Close Menu
              </button>
            </li>
          </ul>
        )}
      </div>

      <div className="flex gap-2 md:gap-4 lg:gap-8 mr-3 md:mr-5 items-center">
        {isLoading ? (
          <div className="text-sm">Loading profile...</div>
        ) : isLoggedIn ? (
          isCompany !== null ? (
            isCompany ? (
              <CompanyProfile />
            ) : (
              <MyProfile />
            )
          ) : (
            <div>Error fetching profile</div>
          )
        ) : (
          <>
            {/* Buttons for Not Logged-In Users */}
            <Link href="/EmployerSignUp">
              <button className="bg-[#040c1b] hover:bg-[#8E3CCB] hover:text-white hover:scale-105 transition-all ease-in-out text-white font-semibold py-1 px-2 sm:px-3 md:py-2 md:px-4 border border-gray-400 rounded shadow w-full md:w-auto text-sm md:text-base">
                For Employers
              </button>
            </Link>

            <Link href="/Login">
              <button className="bg-[#040c1b] hover:bg-[#8E3CCB] hover:text-white hover:scale-105 transition-all ease-in-out text-white font-semibold py-1 px-2 sm:px-3 md:py-2 md:px-4 border border-gray-400 rounded shadow w-full md:w-auto text-sm md:text-base">
                Log in
              </button>
            </Link>

            <Link href="/Register">
              <button className="bg-[#040c1b] hover:bg-[#8E3CCB] hover:text-white hover:scale-105 transition-all ease-in-out text-white font-semibold py-1 px-2 sm:px-3 md:py-2 md:px-4 border border-gray-400 rounded shadow w-full md:w-auto text-sm md:text-base">
                Sign up
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
