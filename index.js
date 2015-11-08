'use strict';

var Adaptor = require('./lib/adaptor');

module.exports = {
  adaptors: ['telegram'],
  adaptor: function(opts) {
    return new Adaptor(opts);
  }
};
