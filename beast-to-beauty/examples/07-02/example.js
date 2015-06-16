#!/usr/bin/env node

var Stream = require("stream");

var stream = new Stream.PassThrough();

var messageLength = null,
    messageChunks = [];

stream.on("readable", function() {
  var chunk;

  console.log("- READABLE");

  while (true) {
    console.log("  - READ LOOP");

    if (messageLength === null) {
      console.log("    - trying to read message length");
      chunk = stream.read(1);

      if (chunk === null) {
        console.log("      - ** couldn't get message length - that's ok, we'll wait **");
        return;
      }

      messageLength = chunk.readUInt8(0);

      console.log("      - message length is: " + messageLength);
    }

    console.log("    - going to try to read " + messageLength + " bytes of data");
    var chunk = stream.read(messageLength);

    if (chunk === null) {
      console.log("      - ** couldn't read any data - that's ok, we'll wait **");
      return;
    }

    messageChunks.push(chunk);
    messageLength -= chunk.length;

    if (messageLength > 0) {
      console.log("      - ** still need " + messageLength + " bytes of data - that's ok, we'll wait **");
      return;
    }

    var message = Buffer.concat(messageChunks).toString();

    console.log("      - got our whole message: " + JSON.stringify(message));

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
