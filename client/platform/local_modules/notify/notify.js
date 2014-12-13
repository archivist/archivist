$ = require("jquery");

/**
 * Expose `notify`.
 */

exports = module.exports = notify;

/**
 * Notification list.
 */

var listTpl = '<ul id="notifications"></ul>',
    spinnerTpl = '<div class="spinner">\
        <div class="double-bounce1"></div>\
        <div class="double-bounce2"></div>\
      </div>';

/**
 * Append to body when it exists.
 */

$(spinnerTpl).appendTo(document.body);
$(listTpl).appendTo(document.body);

var list = $('#notifications'),
    spinnerEl = $('.spinner'),
    active = false;

/**
 * Return a new `Notification` with the given
 * (optional) `title` and `msg`.
 *
 * @param {String} title or msg
 * @param {String} msg
 * @return {Dialog}
 * @api public
 */

function notify(title, msg){
  if (active) return false;
  active = true;
  setTimeout(function(){
    active = false;
  }, 3000);
  switch (arguments.length) {
    case 2:
      return new Notification({ title: title, message: msg })
        .effect('fade')
        .show()
        .hide(2000);
    case 1:
      return new Notification({ message: title })
        .effect('fade')
        .show()
        .hide(2000);
  }
}

function spinner(action) {
  switch(action) {
    case 'show':
      setTimeout(function() {
        spinnerEl.removeClass('hide').addClass('show');
      }, 0);
      break;
    case 'hide':
      $('.spinner').removeClass('show').addClass('hide');
      break;
  }
} 

/**
 * Construct a notification function for `type`.
 *
 * @param {String} type
 * @return {Function}
 * @api private
 */

function type(type) {
  return function(title, msg){
    return notify.apply(this, arguments)
      .type(type);
  };
}

/**
 * Notification methods.
 */

exports.spinner = spinner;
exports.info = notify;
exports.warn = type('warn');
exports.error = type('error');

/**
 * Expose constructor.
 */

exports.Notification = Notification;

/**
 * Initialize a new `Notification`.
 *
 * Options:
 *
 *    - `title` dialog title
 *    - `message` a message to display
 *
 * @param {Object} options
 * @api public
 */

function Notification(options) {
  options = options || {};
  this.el = '<li class="notification hide">\
            <div class="content">\
            <span class="title">Title</span>\
            <a href="#" class="close">&#215;</a>\
            <p>Message</p>\
            </div>\
            </li>';
  this.$el = $(this.el)
  this.render(options);
  if (options.classname) this.$el.addClass(options.classname);
  if (Notification.effect) this.effect(Notification.effect);
}

/**
 * Render with the given `options`.
 *
 * @param {Object} options
 * @api public
 */

Notification.prototype.render = function(options){
  var el = this.$el
    , title = options.title
    , msg = options.message
    , self = this;

  el.find('.close').on('click', function(){
    self.emit('close');
    self.hide();
    return false;
  });

  el.on('click', function(e){
    e.preventDefault();
    self.emit('click', e);
  }); 

  el.find('.title').text(title);
  if (!title) el.find('.title').remove();

  // message
  if ('string' == typeof msg) {
    el.find('p').text(msg);
  } else if (msg) {
    el.find('p').replace(msg.el || msg);
  }

  setTimeout(function(){
    el.removeClass('hide');
  }, 0);
};

/**
 * Enable the dialog close link.
 *
 * @return {Notification} for chaining
 * @api public
 */

Notification.prototype.closable = function(){
  this.$el.addClass('closable');
  return this;
};

/**
 * Set the effect to `type`.
 *
 * @param {String} type
 * @return {Notification} for chaining
 * @api public
 */

Notification.prototype.effect = function(type){
  this._effect = type;
  this.$el.addClass(type);
  return this;
};

/**
 * Show the notification.
 *
 * @return {Notification} for chaining
 * @api public
 */

Notification.prototype.show = function(){
  this.$el.appendTo(list);
  return this;
};

/**
 * Set the notification `type`.
 *
 * @param {String} type
 * @return {Notification} for chaining
 * @api public
 */

Notification.prototype.type = function(type){
  this._type = type;
  this.$el.addClass(type);
  return this;
};

/**
 * Make it stick (clear hide timer), and make it closable.
 *
 * @return {Notification} for chaining
 * @api public
 */

Notification.prototype.sticky = function(){
  return this.hide(0).closable();
};

/**
 * Hide the dialog with optional delay of `ms`,
 * otherwise the notification is removed immediately.
 *
 * @return {Number} ms
 * @return {Notification} for chaining
 * @api public
 */

Notification.prototype.hide = function(ms){
  var self = this;

  // duration
  if ('number' == typeof ms) {
    clearTimeout(this.timer);
    if (!ms) return this;
    this.timer = setTimeout(function(){
      self.hide();
    }, ms);
    return this;
  }

  // hide / remove
  this.$el.addClass('hide');
  if (this._effect) {
    setTimeout(function(self){
      self.remove();
    }, 500, this);
  } else {
    self.remove();
  }

  return this;
};

/**
 * Hide the notification without potential animation.
 *
 * @return {Dialog} for chaining
 * @api public
 */

Notification.prototype.remove = function(){
  this.$el.remove();
  return this;
};