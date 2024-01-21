module.exports = {
  apps: [
    {
      name: 'weather-backend',
      script: 'server',
      instances: 1,
      autorestart: false,
      watch: true,
    },
  ],
};
