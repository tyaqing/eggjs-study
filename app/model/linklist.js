"use strict";
module.exports = app =>{
    const {STRING,INTEGER,BOOLEAN} = app.Sequelize;
    const Linklist = app.model.define('linklist',{
        name:STRING(200), //收集单名称
        cover:INTEGER,
        is_self:BOOLEAN,
        descriptions:STRING(200), // 简介
        user_id:INTEGER, // 创建人
        click:INTEGER, // 点击量
        share:INTEGER, // 分享量
        cat:INTEGER, // 分类
        // tags:
    });

    Linklist.associate = function(){
        // 关联所属用户
        app.model.Linklist.belongsTo(app.model.User,{attributes:['username']});
        // 关联链接
        app.model.Linklist.belongsToMany(app.model.Link,{through: 'link_linklist'})

    }
 

    return Linklist;
}