'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1520666732941_6337';

  // add your config here
  config.middleware = [ 'errorHandler' ];
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.i18n = {
    defaultLocale: 'zh-CN',
  };
  // 数据库
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'www_femirror_co',
    host: 'localhost',
    port: '3306',
    username: 'www_femirror_co',
    password: 'yA2T3wXNprf7DeH6',
  };

  return config;
};
