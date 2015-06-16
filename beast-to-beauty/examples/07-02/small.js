#!/usr/bin/env node

var Stream = require("stream");

var stream = new Stream.PassThrough();

var messageLength = null,
    messageChunks = [];

stream.on("readable", function() {
  var chunk;

  while (true) {
    if (messageLength === null) {
      chunk = stream.read(1);

      if (chunk === null) {
        return;
      }

      messageLength = chunk.readUInt8(0);
    }

    var chunk = stream.read(messageLength);

    if (chunk === null) {
      return;
    }

    messageChunks.push(chunk);
    messageLength -= chunk.length;

    if (messageLength > 0) {
      return;
    }

    var message = Buffer.concat(messageChunks).toString();

    console.log(JSON.stringify(message));

    messageLength = null;
    messageChunks = [];
  }
});

var chunks = [
  Buffer([0x05, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x11, 0x68]),
  Buffer([0x6f, 0x77, 0x20, 0x61, 0x72, 0x65, 0x20, 0x79]),
  Buffer([0x6f, 0x75, 0x20, 0x74, 0x6f, 0x64, 0x61, 0x79]),
];

var interval = setInterval(function() {
  var chunk = chunks.shift();

  if (chunk) {
    stream.write(chunk);
  } else {
    clearInterval(interval);

    stream.end();
  }
}, 1000);
