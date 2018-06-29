
'use strict';
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
        fields: [ 'email', 'username', 'phone' ],
      },
    ],
  });


  User.login = async params => {
    return params;
  };

  User.register = params => {
    console.log(app);
    return params;
  };

  return User;
};
