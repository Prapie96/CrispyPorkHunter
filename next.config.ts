import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol:'https',
        hostname:'lh4.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'lh5.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'streetviewpixels-pa.googleapis.com',
        port: '',
        pathname: '/v1/**',
      },
    ]
  },
  allowedDevOrigins: ["http://192.168.1.44:3000"],
};
export default nextConfig;
