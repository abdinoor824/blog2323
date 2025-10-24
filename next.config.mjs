/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Enable app directory support (for Next.js 13+)
  experimental: {
    appDir: true,
  },

  // ✅ Tell Next.js your source code is inside `/src`
  srcDir: "src",

  // ✅ Allow external images (Google & Cloudinary)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
