#!/usr/bin/env node

var Dissolve = require("dissolve");

var rawPacket = Buffer([
  0x05, 0x68, 0x65, 0x6c, 0x6c, 0x6f,
]);

var parser = Dissolve().uint8("length").string("message", "length").tap(function() {
  console.log(this.vars.message);
});

parser.end(rawPacket);
