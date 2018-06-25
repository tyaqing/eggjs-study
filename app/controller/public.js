"use strict";
const Controller = require('egg').Controller;
const crypto = require('crypto');
const moment = require('moment');

class Public extends Controller {
    // 注册用户
    async register() {
        const {ctx} = this;
        // 过滤数据
        const body = ctx.request.only(['username', 'email', 'password']);
        // 验证数据
        ctx.validate({
            username: {type: 'string', min: 6},
            password: {type: 'string', min: 6},
        });
        //数据库查重
        let res = await ctx.model.User.findOne({where: {'username': body.username}});
        if (res) {
            ctx.throw(404, "该用户名已被注册");
        }
        res = await ctx.model.User.create(body);
        // console.log(ctx.request.only([2]));
        ctx.body = res;
    }
    // 登陆
    async login() {
        const {ctx} = this;

        const body = ctx.request.only(['username', 'password']);
        ctx.validate({
            username: {type: 'string'},
            password: {type: 'string'}
        });
        let user = await ctx.model.User.findOne({where: {username: body.username}});
        if (!user) ctx.throw(404, '用户不存在');
        // 检查密码
        if (user.password != body.password) ctx.throw(404, '密码错误或账号不存在');
        //登陆成功
        ctx.login(user);
        ctx.body = {message: '登陆成功'};
    }

    // 查看登陆状态
    async login_status(){
        const {ctx} = this;
        ctx.body= ctx.user;
    }
    // 退出登录
    async login_out() {
        const {ctx} = this;
        ctx.logout();
        ctx.body = {
            message:'退出成功',
        }
    }

    // 发送验证码
    async send_sms($to, datas) {

        const {ctx} = this;
        const timestamp = moment().format('YYYYMMDDHHmmss');
        const accountId = '8a48b5514d32a2a8014d80695ade37b6';
        const authToken = '29c3cbd1e1f64f7d8bffb1f7866ff742';
        const str1 = accountId + authToken + timestamp;
        const SigParameter = crypto.createHash('md5').update(str1).digest("hex");
        const Authorization = Buffer.from(`${accountId}:` + timestamp).toString('base64');
        const result = await ctx.curl(`https://app.cloopen.com:8883/2013-12-26/Accounts/${accountId}/SMS/TemplateSMS?sig=${SigParameter}`, {
            method: 'POST',
            dataType: 'json',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: Authorization
            },
            data: {
                to: '13203101492',
                appId: `aaf98f894e0afaf7014e169fd7d404df`,
                templateId: `1`,
                datas: ['yzm', 'hahah']
            },
        });
        ctx.body = result;
    }


}

module.exports = Public;