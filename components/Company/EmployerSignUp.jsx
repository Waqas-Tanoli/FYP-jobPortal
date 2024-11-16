"use client";

import axiosClient from "@/app/_utils/axiosClient";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployerSignUp = () => {
  const router = useRouter();
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
        isCompany: true,
        logo: uploadedImage ? uploadedImage.id : null,
      });

      const { jwt, user } = registerRes.data;
      Cookies.set("jwt", jwt, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });

      toast.success("Company Registration successful!");

      setTimeout(() => {
        router.push("/Login");
      }, 1500);

      setFormData({
        username: "",
        email: "",
        password: "",
        location: "",
        slogan: "",
        description: "",
        website: "",
        Company: "",
        logo: "",
      });
      setLogo(null);
    } catch (err) {
      toast.error("Error registering Company. Please try again.");
      console.error("Error registering Company:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#A96EFF] to-[#5932A7] p-6">
      <div className="w-full max-w-2xl bg-[#F5E8FF] rounded-lg shadow-xl p-8 border border-[#A96EFF]">
        <h2 className="text-4xl font-bold text-center mb-8 text-[#5932A7]">
          Register Your Company
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            {
              id: "username",
              label: "Company Username",
              placeholder: "Username for the website",
            },
            {
              id: "Company",
              label: "Company Name",
              placeholder: "Your company's name",
            },
            {
              id: "email",
              label: "Email Address",
              type: "email",
              placeholder: "Your email",
            },
            {
              id: "password",
              label: "Password",
              type: "password",
              placeholder: "Your password",
            },
            {
              id: "location",
              label: "Location",
              placeholder: "Your company's location",
            },
            { id: "slogan", label: "Slogan", placeholder: "Optional slogan" },
            {
              id: "website",
              label: "Website",
              type: "url",
              placeholder: "Optional website",
            },
          ].map((field) => (
            <div className="flex flex-col" key={field.id}>
              <label
                htmlFor={field.id}
                className="text-sm font-medium text-[#3E2069] mb-1"
              >
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type || "text"}
                name={field.id}
                placeholder={field.placeholder}
                className="p-3 border-2 border-[#A96EFF] rounded-lg bg-white text-[#3E2069] placeholder-[#B68AC5] focus:ring-2 focus:ring-[#A96EFF] focus:outline-none"
                value={formData[field.id]}
                onChange={handleChange}
                required={field.id !== "slogan" && field.id !== "website"}
              />
            </div>
          ))}
          <div>
            <label
              htmlFor="description"
              className="text-sm font-medium text-[#3E2069] mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Briefly describe your company (optional)"
              className="p-3 border-2 border-[#A96EFF] rounded-lg bg-white text-[#3E2069] placeholder-[#B68AC5] focus:ring-2 focus:ring-[#A96EFF] focus:outline-none w-full h-28"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="logo"
              className="text-sm font-medium text-[#3E2069] mb-1"
            >
              Company Logo
            </label>
            <input
              id="logo"
              type="file"
              name="logo"
              onChange={handleFileChange}
              accept="image/*"
              className="block w-full p-2 border-2 border-[#A96EFF] rounded-lg bg-[#EFE7FF] text-[#3E2069]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-[#A96EFF] to-[#7B4FA2] text-white font-semibold shadow-lg hover:opacity-90 focus:ring-4 focus:ring-[#A96EFF] focus:outline-none"
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
