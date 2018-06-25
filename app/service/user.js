'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async register(data) {
    const { ctx } = this;
    ctx.model.user.create();
  }
}

module.exports = UserService;
