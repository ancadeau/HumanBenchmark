/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  module.exports = {
    output: "export",
    reactStrictMode: true,
    basePath: '/wdp/Group3',
    images: {
      unoptimized: true
    },
  };
} else {
  module.exports = {
    reactStrictMode: true,
  };
}