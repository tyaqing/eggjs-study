'use strict';

// had enabled by egg
// exports.static = true;
exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.passportLocal = {
  enable: true,
  package: 'egg-passport-local',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.validate = {
  package: 'egg-validate',
};

exports.graphql = {
  enable: true,
  package: 'egg-graphql',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.io = {
  enable: true,
  package: 'egg-socket.io',
};

