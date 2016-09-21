'use strict';

import { Component } from 'substance'
import forEach from 'lodash/forEach'

function Header() {
  Component.apply(this, arguments);
}

Header.Prototype = function() {

  this.render = function($$) {
    var configurator = this.context.configurator;
    var authenticationClient = this.context.authenticationClient;
    var componentRegistry = this.context.componentRegistry;
    var LoginStatus = componentRegistry.get('login-status');

    var el = $$('div').addClass('sc-header');
    var actionEls = [];

    var MenuItems = configurator.getMenuItems();
    forEach(MenuItems, function(item) {
      actionEls.push(
        $$('button').addClass('se-action')
          .append(item.label)
          .on('click', this.send.bind(this, 'navigate', {page: item.action}))
      );
    }.bind(this));

    var content = [];
    if (this.props.content) {
      content = content.concat(this.props.content);
    }

    el.append(
      $$('div').addClass('se-actions').append(actionEls),
      $$('div').addClass('se-content').append(content)
      // $$(LoginStatus, {
      //   user: authenticationClient.getUser()
      // })
    );
    return el;
  };
};

Component.extend(Header);

export default Header;