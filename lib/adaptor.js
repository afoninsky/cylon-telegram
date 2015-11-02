'use strict';

var Cylon = require('cylon');
var Bot = require('node-telegram-bot');

var commands = ['getMe', 'getUserProfilePhotos', 'getFile', 'sendMessage', 'forwardMessage',
  'sendPhoto', 'sendAudio', 'sendDocument', 'sendSticker', 'sendVideo', 'sendLocation',
  'sendChatAction'];

var Adaptor = module.exports = function Adaptor(cfg) {
  Adaptor.__super__.constructor.apply(this, arguments);

  this.cfg = cfg || {};
  this.events = ['message'];

  this.bot = new Bot({
    token: this.cfg.token
  }).on('message', function(message) {
    this.emit('message', message);
  }.bind(this));

  commands.forEach(function (command) {
    this[command] = this.bot[command].bind(this.bot);
  }.bind(this));

};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.connect = function(callback) {
  this.bot.start();
  callback();
};

Adaptor.prototype.disconnect = function(callback) {
  this.bot.stop();
  callback();
};
