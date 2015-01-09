
"use strict";

var ArchivistBackend = require("./archivist_backend");
var Composer = require('substance-composer');
var WebShell = Composer.WebShell;

var ArchivistShell = function() {
  WebShell.call(this, new ArchivistBackend(this));
};

ArchivistShell.Prototype = function() {
};

ArchivistShell.Prototype.prototype = WebShell.prototype;
ArchivistShell.prototype = new ArchivistShell.Prototype();
ArchivistShell.prototype.constructor = ArchivistShell;

module.exports = ArchivistShell;
