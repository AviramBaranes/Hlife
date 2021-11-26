module.exports = {
  env: {
    baseURL:
      // 'http://localhost:8081',
      process.env.CLIENT_APP_BASE_URL || 'http://localhost:8081',
  },
  images: {
    domains: ['localhost'],
  },
  reactStrictMode: true,
};
