import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'lh3.googleusercontent.com',
        pathname: '**',
      },{
        protocol: 'https',
        hostname: 'streetviewpixels-pa.googleapis.com',
        port: '',
        pathname: '/v1/**',
      },
    ]
  }
};

export default nextConfig;
