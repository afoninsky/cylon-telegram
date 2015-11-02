'use strict';

var Adaptor = require('./lib/adaptor');
    // Driver = require('./lib/driver');

module.exports = {
  adaptors: ['telegram'],
  // drivers: ['telegram'],
  // driver: function(opts) {
  //   return new Driver(opts);
  // },
  adaptor: function(opts) {
    return new Adaptor(opts);
  }
};
