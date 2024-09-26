"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import MyProfile from "@/components/Users/MyProfile";
import CompanyProfile from "./Company/CompanyProfile";
import { getUserProfile } from "@/app/api/profile";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCompany, setIsCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
    { id: 2, name: "Find Jobs", path: "/" },
    { id: 3, name: "Career Advice", path: "/" },
    { id: 4, name: "How Job Portal Works", path: "/" },
  ];

  return (
    <div className="flex items-center justify-between mt-2 pl-5 shadow-current">
      <div className="flex items-center gap-10">
        {/* Menu always displayed */}
        <ul className="md:flex gap-8 hidden">
          {Menu.map((item) => (
            <li
              key={item.id}
              className="font-semibold hover:text-[#040c1b] cursor-pointer hover:scale-105 transition-all ease-in-out"
            >
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-9 mr-5 items-center">
        {isLoading ? (
          <div>Loading profile...</div>
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
            <Link href="/EmployerSignUp">
              <button className="bg-[#040c1b] hover:bg-[#8E3CCB] hover:text-white hover:scale-105 transition-all ease-in-out text-white font-semibold py-2 px-3 border border-gray-400 rounded shadow">
                For Employers
              </button>
            </Link>

            <Link href="/Login">
              <button className="bg-[#040c1b] hover:bg-[#8E3CCB] hover:text-white hover:scale-105 transition-all ease-in-out text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Log in
              </button>
            </Link>

            <Link href="/Register">
              <button className="bg-[#040c1b] hover:bg-[#8E3CCB] hover:text-white hover:scale-105 transition-all ease-in-out text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow">
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
