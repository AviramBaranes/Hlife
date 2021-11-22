module.exports = {
  env: {
    baseURL: process.env.CLIENT_APP_BASE_URL || 'http://localhost:8080',
  },
  images: {
    domains: ['localhost'],
  },
  reactStrictMode: true,
};
