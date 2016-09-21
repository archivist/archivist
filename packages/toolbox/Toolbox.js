'use strict';

import { Component } from 'substance'
import forEach from 'lodash/forEach'

function Toolbox() {
  Component.apply(this, arguments);
}

Toolbox.Prototype = function() {

  this.render = function($$) {
    var el = $$('div').addClass('sc-toolbox');
    var actionEls = [];

    if (this.props.actions) {
      forEach(this.props.actions, function(label, actionName) {
        actionEls.push(
          $$('button').addClass('se-action')
            .append(label)
            .on('click', this.send.bind(this, actionName))
        );
      }.bind(this));
    }

    var content = [];
    if (this.props.content) {
      content = content.concat(this.props.content);
    }

    el.append(
      $$('div').addClass('se-actions').append(actionEls),
      $$('div').addClass('se-content').append(content)
    );
    return el;
  };
};

Component.extend(Toolbox);

export default Toolbox;