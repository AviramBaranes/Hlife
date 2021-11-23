module.exports = {
  env: {
    baseURL:
      process.env.CLIENT_APP_BASE_URL || 'https://hlife01.herokuapp.com/',
  },
  images: {
    domains: ['localhost'],
  },
  reactStrictMode: true,
};
