'use strict';

module.exports = app => {

    // 账户验证
    // app.passport.verify(async (ctx, user) => {
    //
    //     console.error('-------------未登录')
    //     if(user.password!="admin"){
    //         ctx.type = 'json';
    //         return false;
    //     }
    //
    //
    //
    //     user.check =123;
    //     return user;
    // });

    // 生成数据库
    app.beforeStart(function* (){
        yield app.model.sync();
    })

}