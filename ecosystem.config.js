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
        // RAZZLE_SPID_LOGIN_URL: 'https://external.comune.it/auth/login',
        // RAZZLE_SPID_LOGOUT_URL: 'https://external.comune.it/auth/logout',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
