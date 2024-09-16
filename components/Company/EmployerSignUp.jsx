"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { register } from "@/app/api/auth";
import { useRouter } from "next/navigation";

const EmployerSignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [logo, setLogo] = useState(null);
  const [location, setLocation] = useState("");
  const [slogan, setSlogan] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [isCompany, setIsCompany] = useState(true);
  const [Company, setCompany] = useState("");
  const router = useRouter();

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(
        username,
        email,
        password,
        undefined,
        Company,
        undefined,
        isCompany,
        location,
        logo,
        slogan,
        website,
        description
      );

      setSuccess(true);
      toast.success("Registration successful! Redirecting to login...");
    } catch (err) {
      setError(err.message || "An error occurred during registration");
      toast.error(err.message || "An error occurred during registration");
    }
  };

  if (success) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <p className="text-lg font-semibold mb-4">Registration successful!</p>
          <Link href="/Login" className="text-blue-600 hover:underline">
            Go to Login
          </Link>
          <ToastContainer />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-md w-full p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Register Your Company
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Company Name
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter username for this website, this can be same as your company name"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="Company"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Company
            </label>
            <input
              id="Company"
              type="text"
              name="Company"
              placeholder="Enter Name of your company or Firm"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={Company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              name="location"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="slogan"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Slogan
            </label>
            <input
              id="slogan"
              type="text"
              name="slogan"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Website
            </label>
            <input
              id="website"
              type="url"
              name="website"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="logo"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Company Logo
            </label>
            <input
              id="logo"
              type="file"
              name="logo"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register Company
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EmployerSignUp;
