"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { login } from "@/app/api/auth";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      setLoading(true);
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { user, jwt } = await login(email, password);

      if (jwt) {
        Cookies.set("token", jwt, {
          secure: process.env.NODE_ENV === "production",
        });
        Cookies.set(
          "user",
          JSON.stringify({
            userId: user.id,
            username: user.username,
          }),
          { secure: process.env.NODE_ENV === "production" }
        );

        toast.success(`Login successful! Welcome, ${user.username}`);
        router.push("/");
      } else {
        setLoading(false);
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      toast.error(
        error.message || "Login failed. Please check your credentials."
      );
      setError(error.message || "Login failed. Please check your credentials.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#A96EFF] to-[#5932A7]">
        <ClipLoader color={"#A96EFF"} size={50} />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#A96EFF] to-[#5932A7] p-6">
      <div className="w-full max-w-lg bg-[#F5E8FF] rounded-lg shadow-xl p-8 border border-[#A96EFF]">
        <h2 className="text-4xl font-bold text-center mb-8 text-[#5932A7]">
          Login to Your Account
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[#3E2069] mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Your email"
              className="p-3 border-2 border-[#A96EFF] rounded-lg bg-white text-[#3E2069] placeholder-[#B68AC5] focus:ring-2 focus:ring-[#A96EFF] focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[#3E2069] mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Your password"
              className="p-3 border-2 border-[#A96EFF] rounded-lg bg-white text-[#3E2069] placeholder-[#B68AC5] focus:ring-2 focus:ring-[#A96EFF] focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-[#A96EFF] to-[#7B4FA2] text-white font-semibold shadow-lg hover:opacity-90 focus:ring-4 focus:ring-[#A96EFF] focus:outline-none"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-[#3E2069]">
            Don&apos;t have an account?{" "}
            <a href="/Register" className="text-[#A96EFF] hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
