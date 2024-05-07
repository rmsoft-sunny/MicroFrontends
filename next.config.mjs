/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CLIENT: process.env.NEXT_PUBLIC_CLIENT,
    ADMIN: process.env.NEXT_PUBLIC_ADMIN,
    PROJECT: process.env.NEXT_PUBLIC_PROJECT,
    FINANCE: process.env.NEXT_PUBLIC_FINANCE,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "clive-staging-resource.s3.ap-northeast-2.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "objectstorage.ap-seoul-1.oraclecloud.com",
        port: "",
      },
    ],
  },
  async rewrites() {
    return [
      {
        basePath: false,
        source: "/api/login",
        destination: `http://dev-rm-seoul.iptime.org:32000/client/v1/api/auth/login`,
      },
      {
        basePath: false,
        source: "/api/logout",
        destination: `http://dev-rm-seoul.iptime.org:32000/client/v1/api/auth/logout`,
      },
      {
        basePath: false,
        source: "/api/client/:path*",
        destination: `http://dev-rm-seoul.iptime.org:32000/client/v1/api/:path*`,
      },
      {
        basePath: false,
        source: "/api/project/:code/:path*",
        destination: `http://dev-rm-seoul.iptime.org:32000/:code/prj/v1/api/:path*`,
      },
      {
        basePath: false,
        source: "/api/contents/:path*",
        destination: `http://dev-rm-seoul.iptime.org:32000/contents/v1/api/:path*`,
      },
      {
        basePath: false,
        source: "/api/finance/:path*",
        destination: `http://dev-rm-seoul.iptime.org:32000/finance/v1/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
