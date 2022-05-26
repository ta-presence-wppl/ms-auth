module.exports = {
    apps : [{
      name:'ta-presence-auth',
      script: 'app.js',
      watch: '.',
      ignore_watch: ['api/logapi','tmp','upload'],
      env: {
        "NODE_ENV": "development",
        "PORT": 1101,
        "DATABASE_CONN": "postgres://pengembang:pemulateknologi@182.253.188.180:5432/db_presensi",
        "JWT_CONF_TOKEN": "$1$MVdV2Riq$C37FIkSV7yHA5gowfCKnD0",
        "JWT_TOKEN_ATASAN": "0e186e6fc639e92528d02613b8cd2baa"
      },
      env_production: {
        "NODE_ENV": "production",
        "PORT": 1101,
        "DATABASE_CONN": "postgres://pengembang:pemulateknologi@182.253.188.180:5432/db_presensi",
        "JWT_CONF_TOKEN": "$1$MVdV2Riq$C37FIkSV7yHA5gowfCKnD0",
        "JWT_TOKEN_ATASAN": "0e186e6fc639e92528d02613b8cd2baa"
      }
    }],
  
    deploy : {
      production : {
        user : 'SSH_USERNAME',
        host : 'SSH_HOSTMACHINE',
        ref  : 'origin/master',
        repo : 'GIT_REPOSITORY',
        path : 'DESTINATION_PATH',
        'pre-deploy-local': '',
        'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
        'pre-setup': ''
      }
    }
  };
  