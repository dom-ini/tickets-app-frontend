/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "picsum.photos",
      "ticketsapp-media.s3.eu-central-1.amazonaws.com",
    ],
  },
  env: {
    apiUrl: process.env.API_URL,
  },
};

module.exports = nextConfig;
