'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        // const {ctx} = this;
        // let res = await this.ctx.model.User.sync().then(() => {
        //     // Table created
        //     return this.ctx.model.User.create({
        //         firstName: 'John2',
        //         lastName: 'Hancock'
        //     });
        // });
        this.ctx.body = {'msg':'访问成功'};
    }
}

module.exports = HomeController;
 