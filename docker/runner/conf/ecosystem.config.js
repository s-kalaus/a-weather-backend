module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'npm',
      args: 'run start',
      instances: 1,
      autorestart: false,
      watch: false,
    },
  ],
};
