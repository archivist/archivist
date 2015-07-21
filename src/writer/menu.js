var $$ = React.createElement;
var Substance = require("archivist-core").Substance;
var _ = Substance._;

var menuItems = [
  {label: 'Dashboard', name: 'dashboard', icon: 'tasks', url: '/'},
  {label: 'Subjects', name: 'subjects', icon: 'tags', url: '/subjects'},
  {label: 'Prisons', name: 'prisons', icon: 'th', url: '/prisons'},
  {label: 'Toponyms', name: 'topo', icon: 'globe', url: '/toponyms'},
  {label: 'Definitions', name: 'definition', icon: 'bookmark', url: '/definitions'},
  {label: 'Persons', name: 'person', icon: 'users', url: '/persons'},
  {label: 'Merge entities', name: 'merge', super: true, icon: 'code-fork', url: '/merge'},
  {label: 'Users', name: 'users', super: true, icon: 'user-plus', url: '/users'}
];

// The Menu
// ----------------

var Menu = React.createClass({
  contextTypes: {
    backend: React.PropTypes.object.isRequired,
    app: React.PropTypes.object.isRequired,
  },

  displayName: "Menu",

  handleLogout: function(e) {
    e.preventDefault();
    var backend = this.context.backend;
    var app = this.context.app;

    backend.destroySession();
  },

  getLoginInfo: function() {
    var backend = this.context.backend;
    var user = backend.getUser();
    return $$('div', {className: "user-section"},
      $$('span', {
        className: "logout",
        onClick: this.handleLogout,
        dangerouslySetInnerHTML: {__html: '<i class="fa fa-power-off"></i>'}
      }),
      $$('div', {className: "userpic"},
        $$('img', {
          src: user.picture,
        })
      ),
      $$('div', {className: "username"}, user.username)
    );
  },

  render: function() {
    var self = this;
    var backend = this.context.backend;
    var isSuper = backend.isSuperUser();
    var menuItemEls = [];
    _.each(menuItems, function(menuItem) {
      if((menuItem.super && isSuper) || !menuItem.super) {
        menuItemEls.push($$('a', {
          id: menuItem.name,
          href: '/archivist' + menuItem.url,
          dangerouslySetInnerHTML: {__html: '<i class="fa fa-'+menuItem.icon+'"></i> <span class="title">' + menuItem.label + '</span>'}
        }));
      }
    }, this);
    return $$("div", {id: "topbar"},
      $$('header', {className: "branding"}, "Archivist"),
      $$('nav', {className: "topbar"},
        menuItemEls
      ),
      self.getLoginInfo()
    );
  }
});

module.exports = Menu;