module.exports = {
  apps: [
    {
      name: 'weather-backend',
      script: 'server',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
