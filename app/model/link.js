"use strict";
module.exports = app =>{
    const {STRING,INTEGER,JSON} = app.Sequelize;
    const Link = app.model.define('link',{
        url:STRING(200), // 链接地址
        title:STRING(200),
        descriptions:STRING(200), // 简介
        content:STRING(1000),
        icon:INTEGER, // 图标
        origin:JSON, // 网站原始信息

    });

    // console.log('model',app.ctx.model.User)

    Link.associate = function(){
        app.model.Link.belongsTo(app.model.User);
    }

    //Link.belongsTo(app.model.User);


    return Link;
}