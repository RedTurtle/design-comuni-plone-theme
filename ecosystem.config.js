module.exports = {
  apps: [
    {
      name: 'italia-volto',
      script: 'build/server.js',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        SPID_LOGIN_URL: '/login',
        SPID_LOGOUT_URL: '/logout',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
