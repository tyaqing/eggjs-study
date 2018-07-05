'use strict';
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

exports.sign = user => {
  const cert = fs.readFileSync(path.resolve(__dirname, '../public/private.pem'));
  return jwt.sign(user, cert);

};

exports.verify = token => {
  const cert = fs.readFileSync(path.resolve(__dirname, '../public/private.pem'));
  return jwt.verify(token, cert);
};
