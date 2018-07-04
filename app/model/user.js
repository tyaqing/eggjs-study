'use strict';

const md5 = require('../public/md5');
const jwt = require('jsonwebtoken');

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define('user', {
    username: STRING(30),
    password: STRING(32),
    email: STRING(32),
    phone: STRING(11),
    avatar: INTEGER,
  }, {
    indexes: [
      {
        unique: true,
        fields: [ 'phone' ],
      },
      {
        unique: true,
        fields: [ 'email' ],
      },
    ],
  });


  User.login = async params => {
    const { phone, password } = params;
    let user = await User.findOne({ where: { phone }, attributes: [ 'phone', 'password', 'id' ] });
    if (!user) throw { status: 404, error: '找不到用户', detail: '语法错误' };
    const dePassword = md5(password);
    if (dePassword !== user.password) throw { status: 403, error: '验证失败' };
    // 生成token
    user = user.toJSON();
    delete user.password;
    const token = jwt.sign(user, 'shhhhh');
    user.token = token;
    // console.log('token', user);
    return user;
  };

  User.verify = async body => {
    const { token } = body;
    // 验证
    const decoded = jwt.verify(token, 'shhhhh');
    return decoded;
  };

  User.register = async body => {
    console.log(body);
    let { phone, password } = body;
    // 查重
    const user = await User.findOne({ where: { phone }, attributes: [ 'phone' ] });
    if (user) throw { status: 403, error: '该账号已被注册' };
    password = md5(password);
    const res = await User.create({
      phone, password,
    });
    return res;
  };

  return User;
};
