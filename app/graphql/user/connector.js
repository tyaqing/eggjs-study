'use strict';

const DataLoader = require('dataloader');
const _ = require('lodash');
class UserConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(this.fetch.bind(this));
  }

  fetch(ids) {
    const users = this.ctx.app.model.User.findAll({
      where: {
        id: {
          $in: ids,
        },
      },
    }).then(us => us.map(u => u.toJSON()));
    return users;
  }

  fetchByIds(ids) {
    return this.loader.loadMany(ids);
  }

  fetchById(id) {
    return this.loader.load(id);
  }

  fetchMe() {
    const users = this.ctx.app.model.User.findAll({
      where: {},
    }).then(us => us.map(u => u.toJSON()));
    return users;
  }
  // 创建用户
  async create(params) {
    return await this.ctx.app.model.User.create(params);
  }
  // 更新用户
  async update(params) {
    const { id } = params;
    await this.ctx.app.model.User.update(_.pickBy(params), { where: { id } });
    const item = await this.ctx.app.model.User.findOne({ where: { id } });
    return item.toJSON();
  }
}

module.exports = UserConnector;

