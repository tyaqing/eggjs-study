'use strict';

// exports default{}

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1520666732941_6337';

  // add your config here
  config.middleware = [ 'errorHandler', 'graphql' ];
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
  config.graphql = {
    router: '/graphql',
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    graphiql: true,
    // graphQL 路由前的拦截器
    * onPreGraphQL(ctx) {
      console.log(ctx);
    },
    // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
    * onPreGraphiQL(ctx) {
      console.log(ctx);
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };


  return config;
};
