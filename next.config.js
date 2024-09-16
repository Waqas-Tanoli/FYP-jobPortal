/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    loader: "default",

    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
