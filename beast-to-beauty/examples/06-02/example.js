#!/usr/bin/env node

var rawPacket = Buffer([
  0x02, 0x05, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x11,
  0x68, 0x6f, 0x77, 0x20, 0x61, 0x72, 0x65, 0x20,
  0x79, 0x6f, 0x75, 0x20, 0x74, 0x6f, 0x64, 0x61,
  0x79,
]);

var parse = function parse(rawPacket) {
  var messageCount = rawPacket.readUInt8(0);

  var messages = [];

  var offset = 1;
  for (var i=0;i<messageCount;++i) {
    var messageLength = rawPacket.readUInt8(offset++),
        messageContent = rawPacket.toString("ascii", offset, offset += messageLength);

    messages.push(messageContent);
  }

  return messages;
};

var packet = parse(rawPacket);

console.log(JSON.stringify(packet, null, 2));
