'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  // 检测登陆中间件
  const checkLogin = app.middleware.checkLogin();

  router.post('/jsonql', controller.public.jsonql);

  // 链接
  // router.resources('link','/link',controller.link)

  router.get('/link/new', checkLogin, controller.link.new);
  // router.post('/link/new',controller.link.new);

  // 收藏链接
  // router.get('/link/new',checkLogin,controller.link.new);

  // 收藏夹
  router.resources('linklist', '/linklist', checkLogin, controller.linklist);
  router.get('/linklist/my', checkLogin, controller.linklist.my);
};
