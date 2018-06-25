"use strict";
/**
 * 检测登陆中间件
 * @param options
 * @returns {checkLogin}
 */
module.exports = options =>{
   return async function checkLogin(ctx,next){
        console.log('意思是我没运行')
        if(!ctx.isAuthenticated()){
            ctx.throw(401, "未登录");
        }
        await next();
    }
}
