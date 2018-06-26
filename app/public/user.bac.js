'use strict';
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    email: STRING(50),
    username: STRING(30),
    password: STRING(32),
    created_at: DATE,
    updated_at: DATE,
  }, {
    indexes: [
      {
        unique: true,
        fields: [ 'email', 'username' ],
      },
    ],
  });

  User.findByLogin = function* (login) {
    return yield this.findOne({
      where: {
        login,
      },
    });
  };

  User.prototype.logSignin = function* () {
    yield this.update({ last_sign_in_at: new Date() });
  };

  return User;
};
