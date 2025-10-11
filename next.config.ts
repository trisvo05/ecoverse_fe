// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
  
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://ecoverse.namtech.me/api/:path*", // API backend của bạn
      },
    ];
  },
};

export default nextConfig;
