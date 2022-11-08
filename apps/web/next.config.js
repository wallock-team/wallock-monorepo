/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    webUrl: process.env.WEB_URL,
    apiUrl: process.env.API_URL
  }
}

module.exports = nextConfig
