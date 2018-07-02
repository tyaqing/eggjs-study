'use strict';
const Controller = require('egg').Controller;
class Linklist extends Controller {
  async index() {
    const { ctx } = this;
    const res = await ctx.model.Linklist.findAll({
      order: [[ 'id', 'DESC' ]],
      include: [{
        model: ctx.model.User,
        // attributes:['username']
      }],
    });
    ctx.body = res;
  }


  async create() {
    const { ctx } = this;
    const body = ctx.request.only([ 'name', 'cover', 'descriptions', 'tags', 'is_self' ]);
    ctx.validate({
      name: { type: 'string' },
      cover: { type: 'string' },
      is_self: { type: 'string' },
    });

    body.user_id = ctx.user.id;
    const res = await ctx.model.Linklist.create(body);
    ctx.body = res;
  }

  // 获取我的收藏夹列表
  async my() {
    const { ctx } = this;
    const res = await ctx.model.Linklist.findAll({
      where: { user_id: ctx.user.id },
      order: [[ 'id', 'DESC' ]],
      limit: 10,
      offset: 0,
    });
    ctx.body = res;

  }


  async destroy() {

  }

  async new() {

  }
}

module.exports = Linklist;
