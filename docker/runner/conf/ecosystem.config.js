module.exports = {
  apps: [
    {
      name: 'weather-backend',
      script: 'npm',
      args: 'run start',
      instances: 1,
      autorestart: false,
      watch: false,
    },
  ],
};
