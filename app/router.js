'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  // 检测登陆中间件
  const checkLogin = app.middleware.checkLogin();

  // 注册
  router.post('/register', controller.public.register);
  // 发送验证码
  // router.post('/send_sms',controller.public.send_sms);
  // 退出登陆
  router.get('/login_out', controller.public.login_out);
  // 登陆
  router.post('/login', controller.public.login);
  // 获取登陆状态
  router.get('/login_status', checkLogin, controller.public.login_status);


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
