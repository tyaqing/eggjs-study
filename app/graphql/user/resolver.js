'use strict';

module.exports = {
  Query: {
    user(root, { id }, ctx) {
      return ctx.connector.user.fetchById(id);
    },

    users(root, params, ctx) {
      // console.log(root);
      return ctx.connector.user.fetchMe();
    },
    me(root, { id }, ctx) {
      return ctx.connector.user.fetchMe();
    },
  },
  Mutation: {
    createUser(root, params, ctx) {
      return ctx.connector.user.create(params);
    },
    updateUser(root, params, ctx) {
      return ctx.connector.user.update(params);
    },
  },
};
