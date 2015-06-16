#!/usr/bin/env node

var Dissolve = require("dissolve");

var rawPacket = Buffer([
  0x02, 0x05, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x11,
  0x68, 0x6f, 0x77, 0x20, 0x61, 0x72, 0x65, 0x20,
  0x79, 0x6f, 0x75, 0x20, 0x74, 0x6f, 0x64, 0x61,
  0x79,
]);

var parser = Dissolve().uint8("count").tap(function() {
  var remaining = this.vars.count;

  this.loop("messages", function(done) {
    this.uint8("length").string("message", "length").tap(function() {
      remaining--;

      if (!remaining) {
        return done();
      }
    });
  }).tap(function() {
    console.log(JSON.stringify(this.vars, null, 2));
  });
});

parser.end(rawPacket);
