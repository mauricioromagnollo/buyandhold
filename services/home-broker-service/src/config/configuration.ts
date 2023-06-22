export default () => ({
  nodeEnv: process.env.NODE_ENV,
  appName: process.env.APP_NAME,
  server: {
    port: parseInt(process.env.SERVER_PORT) || 3000,
    host: process.env.SERVER_HOST,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
});
