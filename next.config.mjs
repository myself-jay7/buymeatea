/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // ✅ Added Cloudinary support
      },
    ],
  },
};

export default nextConfig;
