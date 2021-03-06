'use strict';

module.exports = {
  Query: {
    tags(root, params, ctx) {
      return ctx.connector.tag.fetchRecommandation();
    },
  },
  Item: {
    tags(root, _, ctx) {
      return ctx.connector.tag.fetchByItemId(root.id);
    },
  },
  Mutation: {
    attachTag(root, { itemID, tag }, ctx) {
      return ctx.connector.tag.attach(itemID, tag);
    },
    removeTag(root, { id }, ctx) {
      return ctx.connector.tag.remove(id);
    },
  },
};
