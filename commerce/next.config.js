/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  env:{
    supplier_account:"8267fb46-35aa-4225-9719-f7bdaec3490b",
    ecommerce_account:"e152d2cb-a81f-4f18-859b-6beae6f02d97",
    ecommerce_secret:"yc5xzh5g",
    jwtSecret:'zxcvbnm',
    MONGO_URI:'mongodb+srv://Mozammal:M%40zammal@cluster0.zltor.mongodb.net/ecommerce?retryWrites=true&w=majority',
  },
}

module.exports = nextConfig
