module.exports = {
  reactStrictMode: true,
  async rewrites() {
    if (process.env.NODE_ENV !== 'production') {
      return [
        {
          source: process.env.SOURCE_PATH,
          destination: process.env.DESTINATION_URL,
        },
      ];
    }
  },
}