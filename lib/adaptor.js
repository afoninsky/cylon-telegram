'use strict';

var Cylon = require('cylon');
var Bot = require('node-telegram-bot-api');

var Adaptor = module.exports = function Adaptor(cfg) {
  Adaptor.__super__.constructor.apply(this, arguments);

  this.cfg = cfg || {};
  this.events = ['message'];

  this.bot = new Bot(this.cfg.token, {polling: true});
  this.bot.on('message', function(message) {
    this.emit('message', message);
  }.bind(this));
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.connect = function(callback) {
  callback();
};

Adaptor.prototype.disconnect = function(callback) {
  callback();
};
