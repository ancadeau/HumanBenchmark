/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  module.exports = {
    output: "export",
    reactStrictMode: true,
//    basePath: '/html',
    images: {
      unoptimized: true
    },
  };
} else {
  module.exports = {
    reactStrictMode: true,
  };
}