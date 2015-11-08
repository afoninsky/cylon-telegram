'use strict';
var Cylon = require('cylon');

var token = process.argv[2];

if(!token) {
  console.log('please pass telegram API token as argument - i cant connect');
  process.exit(1);
}

var answers = ['ok', 'what?', 'huh', 'lol', 'a u sure?', 'no no', 'nah', 'yeh', 'yep', 'nope', 'rofl', ':)', ';))'];
function getRandomAnswer() {
  return answers[Math.floor(Math.random() * answers.length)];
}

Cylon.robot({
  name: 'Petka',
  connections: {
    api: { adaptor: 'telegram', token: token }
  },
  work: function (me) {
    var bot = me.connections.api.bot;
    /*
    { message_id: 9,
      from: { id: 57684913, first_name: 'Andrey', username: 'vkfont' },
      chat:
       { id: 57684913,
         first_name: 'Andrey',
         username: 'vkfont',
         type: 'private' },
      date: 1446472468,
      text: 'привет василий' }
     */
    bot.on('message', function (message) {
      console.log('message from %s: %s', message.chat.username, message.text);
      bot.sendMessage(message.chat.id, getRandomAnswer());
    });
  }

});

Cylon.start();
