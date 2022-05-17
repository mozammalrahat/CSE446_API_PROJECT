/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env:{
    MONGO_URI:'mongodb+srv://Mozammal:M%40zammal@cluster0.zltor.mongodb.net/ecommerce?retryWrites=true&w=majority',
  },
}

module.exports = nextConfig
