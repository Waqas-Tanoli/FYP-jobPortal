"use client";

import axiosClient from "@/app/_utils/axiosClient";
import Cookies from "js-cookie";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployerSignUp = () => {
  const [logo, setLogo] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    location: "",
    slogan: "",
    description: "",
    website: "",
    Company: "",
  });

  const [error, setError] = useState("");

  const [isCompany, setIsCompany] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedImage = null;
      if (logo) {
        const form = new FormData();
        form.append("files", logo);
        const uploadRes = await axiosClient.post("/upload", form);
        uploadedImage = uploadRes.data[0];
      }

      const registerRes = await axiosClient.post("/auth/local/register", {
        ...formData,
        logo: uploadedImage ? uploadedImage.id : null,
      });
      const { jwt, user } = registerRes.data;
      Cookies.set("jwt", jwt, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });

      toast.success("Registration successful!");

      setFormData({
        username: "",
        email: "",
        password: "",
        location: "",
        slogan: "",
        description: "",
        website: "",
        Company: "",
      });
      setLogo(null);
    } catch (err) {
      toast.error("Error registering user. Please try again.");
      console.error("Error registering user:", err);
    } finally {
      setLoading(false);
    }
  };

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
              value={formData.username}
              onChange={handleChange}
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
              value={formData.Company}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
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
              value={formData.location}
              onChange={handleChange}
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
              value={formData.slogan}
              onChange={handleChange}
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
              value={formData.website}
              onChange={handleChange}
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
              value={formData.description}
              onChange={handleChange}
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
              onChange={handleFileChange}
              accept="image/*"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? "Registering Company..." : "Register"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EmployerSignUp;
