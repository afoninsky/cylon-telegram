# Cylon.js for Telegram API

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics, physical computing, and the Internet of Things (IoT). Telegram (https://telegram.org) is a popular messenger on various platform with official bot support.

This repository contains the adaptor to integrate cylon with telegram API. It can be used to send and receive messages with cylon, communicate via messenger.

## How to Use

1) [Follow instructions](https://telegram.me/BotFather) and create own bot.

2) Run this code

```javascript
'use strict';
var Cylon = require('cylon');

var token = 'PASTE_TOKEN_HERE'

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
    var api = me.connections.api;
    api.on('message', function (message) {
      console.log('message from %s: %s', message.chat.username, message.text);

      api.sendMessage({
        chat_id: message.chat.id,
        text: getRandomAnswer(),
      });

    });
  }

});

Cylon.start();
```

## License

Copyright (c) 2015. Licensed under the Apache 2.0 license.
