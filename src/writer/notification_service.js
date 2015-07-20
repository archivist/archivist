"use strict";

var Substance = require("substance");

// Notification service
// ----------------
//

var NotificationService = function() {
  NotificationService.super.call(this);
  this.messages = [];
};

NotificationService.Prototype = function() {

  this.addMessage = function(msg) {
    this.messages.push(msg);
    this.emit('messages:updated', this.messages);
  };

  this.log = function(msg) {
    this.addMessage({
      type: 'info',
      message: msg
    });
  };

  this.error = function(msg) {
    this.addMessage({
      type: 'error',
      message: msg
    });
  };

  this.warn = this.log;
  this.info = this.log;

  this.clearMessages = function() {
    this.messages = [];
    this.emit('messages:updated', this.messages);
  };
};

Substance.inherit(NotificationService, Substance.EventEmitter);

module.exports = NotificationService;