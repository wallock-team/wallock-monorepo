/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    url: {
      web: process.env.WEB_URL,
      api: process.env.API_URL
    }
  }
}

module.exports = nextConfig
