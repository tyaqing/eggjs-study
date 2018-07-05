'use strict';
const { Controller } = require('egg');
const md5 = require('../public/md5');
class User extends Controller {

  // 注册
  async register() {
    const { ctx } = this;
    const { phone, password } = ctx.request.body;

    const user = await ctx.model.User.register({ phone, password });

    // if (user) throw { status: 403, error: '该账号已被注册' };
    ctx.body = user;
  }
}

module.exports = User;
