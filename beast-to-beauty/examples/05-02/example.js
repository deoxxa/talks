#!/usr/bin/env node

var rawPacket = Buffer([
  0x05, 0x68, 0x65, 0x6c, 0x6c, 0x6f,
]);

var parse = function parse(rawPacket) {
  var messageLength = rawPacket.readUInt8(0),
      messageContent = rawPacket.toString("ascii", 1, 1 + messageLength);

  return messageContent;
};

var message = parse(rawPacket);

console.log(message);
