'use strict';
const Controller = require('egg').Controller;
const crypto = require('crypto');
const moment = require('moment');
const validate = require('validate.js');

class Public extends Controller {
  // 注册用户
  async register() {
    const { ctx } = this;
    // 过滤数据
    const body = ctx.request.only([ 'username', 'email', 'password' ]);
    // 验证数据
    ctx.validate({
      username: { type: 'string', min: 6 },
      password: { type: 'string', min: 6 },
    });
    // 数据库查重
    let res = await ctx.model.User.findOne({ where: { username: body.username } });
    if (res) {
      ctx.throw(404, '该用户名已被注册');
    }
    res = await ctx.model.User.create(body);
    // console.log(ctx.request.only([2]));
    ctx.body = res;
  }
  // 登陆
  async login() {
    const { ctx } = this;

    const body = ctx.request.only([ 'username', 'password' ]);
    console.log(ctx.header);

    const constraints = {
      username: {
        presence: {
          message: '嘿嘿',
        },
        exclusion: {
          within: [ 'nicklas' ],
          message: "'%{value}' 是不允许的",
        },
      },
      password: {
        presence: true,
        length: {
          minimum: 6,
          message: '要大于6个字符',
        },
      },
    };

    const res = validate({ password: 'bad' }, constraints);
    if (res) {
      ctx.body = res;
      return;
    }

    const user = await ctx.model.User.findOne({ where: { username: body.username } });
    if (!user) ctx.throw(404, '用户不存在');
    // 检查密码
    if (user.password !== body.password) ctx.throw(404, '密码错误或账号不存在');
    // 登陆成功
    ctx.login(user);
    ctx.body = { message: '登陆成功' };
  }

  // 查看登陆状态
  async login_status() {
    const { ctx } = this;
    ctx.body = ctx.user;
  }
  // 退出登录
  async login_out() {
    const { ctx } = this;
    ctx.logout();
    ctx.body = {
      message: '退出成功',
    };
  }

  // 发送验证码
  async send_sms($to, datas) {

    const { ctx } = this;
    const timestamp = moment().format('YYYYMMDDHHmmss');
    const accountId = '8a48b5514d32a2a8014d80695ade37b6';
    const authToken = '29c3cbd1e1f64f7d8bffb1f7866ff742';
    const str1 = accountId + authToken + timestamp;
    const SigParameter = crypto.createHash('md5').update(str1).digest('hex');
    const Authorization = Buffer.from(`${accountId}:` + timestamp).toString('base64');
    const result = await ctx.curl(`https://app.cloopen.com:8883/2013-12-26/Accounts/${accountId}/SMS/TemplateSMS?sig=${SigParameter}`, {
      method: 'POST',
      dataType: 'json',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization,
      },
      data: {
        to: '13203101492',
        appId: 'aaf98f894e0afaf7014e169fd7d404df',
        templateId: '1',
        datas: [ 'yzm', 'hahah' ],
      },
    });
    ctx.body = result;
  }

  async query(rep) {
    const { ctx } = this;
    // console.log(rep);
    const { model, values } = rep;
    let { offset = 0, limit = 10, field, page = 1, order = [[ 'id', 'DESC' ]] } = values;
    if (page > 1) {
      offset = limit * (page - 1);
    }

    // 处理attr
    const attributes = field.split(',');

    const data = await ctx.model[model].findAndCountAll({
      // where: values.where,
      attributes,
      offset,
      limit,
      order,
    });
    const addOne = (data.count % limit) > 0 ? 1 : 0;
    data.total_page = parseInt(data.count / limit) + addOne;
    data.current_page = page;
    return data;
  }

  async queryOne(rep) {
    const { ctx } = this;
    const { model, values, query } = rep;
    const { field } = values;
    const attributes = field.split(',');
    return await ctx.model[model].findOne({
      where: query,
      attributes,

    });
  }

  async mutation(rep) {
    const { ctx } = this;
    // console.log(rep);
    const { model, method, values } = rep;
    return await ctx.model[model][method](values);
  }
  // 主接口
  // TODO 上传
  async jsonql() {
    const { ctx } = this;
    const { body } = ctx.request;
    // 解析mutation
    const res = {};
    const repObj = this.repParse(body);
    // 遍历query和mutation
    for (const rep of repObj) {
      console.log(rep);
      if (rep.type === 'mutation') res[rep.name] = await this.mutation(rep);
      else {
        if (rep.method === 'findOne') res[rep.name] = await this.queryOne(rep);
        else if (rep.method === 'findAll') res[rep.name] = await this.query(rep);
        else {
          // 统计么
        }
      }

    }
    ctx.body = res;
  }

  // 请求解析
  repParse(body) {
    const resObj = [];
    for (const rep in body) {
      // 匹配表达式
      const result = rep.match(/^([A-Za-z]+)\:(mutation|query{1})\s{1}([A-Za-z]+)\.([A-Za-z]+)\(([\S]*)\)$/);
      // 解析query page=1,limit=2
      const query = {};
      if (result[5]) {
        const queryArr = result[5].split(',');
        queryArr.length && queryArr.forEach(q => {
          console.log(q);
          const kv = q.match(/([^\=]+)\={1}([^\=]+)$/);
          if (kv.length < 3) this.ctx.throw(404, { message: '查询语法错误', detail: `${q} 语法错误` });
          query[kv[1]] = kv[2];
        });
      }

      if (result) {
        resObj.push({
          name: result[1],
          type: result[2],
          model: result[3],
          method: result[4],
          query,
          values: body[rep],
        });
      } else {
        this.ctx.throw(404, { message: '查询语法错误', detail: `${rep} 语法错误` });
      }
    }
    return resObj;
  }
}
module.exports = Public;
