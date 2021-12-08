module.exports = {
  env: {
    baseURL: process.env.CLIENT_APP_BASE_URL || 'http://localhost:8081',
  },
  images: {
    domains: ['localhost'],
  },
  reactStrictMode: true,
};
