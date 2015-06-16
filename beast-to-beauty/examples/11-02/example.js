#!/usr/bin/env node

var Dissolve = require("dissolve");

var parser = Dissolve().loop(function(done) {
  this.uint8("length").string("message", "length").tap(function() {
    console.log(JSON.stringify(this.vars.message));
  });
});

var chunks = [
  Buffer([0x05, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x11, 0x68]),
  Buffer([0x6f, 0x77, 0x20, 0x61, 0x72, 0x65, 0x20, 0x79]),
  Buffer([0x6f, 0x75, 0x20, 0x74, 0x6f, 0x64, 0x61, 0x79]),
];

var interval = setInterval(function() {
  var chunk = chunks.shift();

  if (chunk) {
    parser.write(chunk);
  } else {
    clearInterval(interval);

    parser.end();
  }
}, 1000);
