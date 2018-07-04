'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const Attachment = app.model.define('attachment', {
    user_id: INTEGER,
    url: STRING(64),
  });

  // 关联
  Attachment.belongsTo(app.model.User);

  return Attachment;
};
