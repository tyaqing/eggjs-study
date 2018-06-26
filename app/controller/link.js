'use strict';
const Controller = require('egg').Controller;
class LinkController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = { hei: '嘿嘿' };
  }

  // 通过get添加的url
  async new() {
    const { ctx } = this;
    const body = ctx.request.only([ 'u', 't' ]);

    // ctx.body= ctx.user;
    // return;
    ctx.validate({
      u: { type: 'url' },
      t: { type: 'string' },
    }, body);
    // 查重
    let res = await ctx.model.Link.findOne({ where: { url: body.u, user_id: ctx.user.id } });
    if (res) {
      ctx.body = res;
      return;
    }
    // 没有就再获取
    res = await ctx.model.Link.create({
      url: body.u,
      title: body.t,
      user_id: 1 || ctx.user.id,
    });
    ctx.body = res;

  }
  // 通过post得到的url
  async create() {
    const { ctx } = this;
    const body = ctx.request.only([ 'url' ]);
    ctx.body = ctx.request;

    return;

    ctx.validate({
      url: { type: 'url' },
    }, body);

    // 查重
    let res = await ctx.model.Link.findOne({ where: { url: body.url } });
    if (res) {
      ctx.body = res;
      return;
    }

    // 没有就再获取
    const title = await this.get_info(body.url);
    res = await ctx.model.Link.create({
      url: body.url,
      title,
      user_id: ctx.user.id,
    });
    ctx.body = res;
  }


  // 获取链接基本信息
  async get_info($url) {
    const { ctx } = this;
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({ args: [ '--no-sandbox', '--disable-setuid-sandbox' ] });
    const page = await browser.newPage();
    await page.goto($url);
    // await page.setViewport({width:1280,height:960});
    // await page.screenshot({path: `screenshot/${guid}.jpeg`,quality:60,clip:{width:1280,height:960,x:0,y:0}});
    // const dimensions = await page.evaluate(() => {
    //     return {
    //         width: document.documentElement.clientWidth,
    //         height: document.documentElement.clientHeight,
    //         deviceScaleFactor: window.devicePixelRatio
    //     };
    // });
    const title = await page.title();
    await browser.close();
    return title;

  }
}


module.exports = LinkController;
