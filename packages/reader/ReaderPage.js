'use strict';

var Layout = require('substance/ui/Layout');
var Button = require('substance/ui/Button');
var Loader = require('../common/Loader');
var Reader = require('./Reader');

function ReaderPage() {
  Loader.apply(this, arguments);
}

ReaderPage.Prototype = function() {

  this.render = function($$) {
    var userSession = this.props.userSession;
    var el = $$('div').addClass('sc-preview-document');

    var layout = $$(Layout, {
      width: 'large'
    });

    // Display top-level errors. E.g. when a doc could not be loaded
    // we will display the notification on top level
    if (this.state.error) {
      layout.append($$(Notification, {
        type: 'error',
        message: this.state.error.message
      }));
    } else if (this.state.session) {
      if (!userSession && !this.props.mobile) {
        layout.append(
          $$(Layout, {
            textAlign: 'center',
            noPadding: true
          }).append(
            $$(Button).addClass('se-new-note-button').append(
              this.context.iconProvider.renderIcon($$, 'edit-note'),
              ' Edit'
            ).on('click', this._requestLogin)
          )
        );
      }

      layout.append(
        $$(Reader, {
          disabled: true,
          configurator: this.props.configurator,
          mobile: this.props.mobile,
          documentSession: this.state.session
        }).ref('reader')
      );
    }

    el.append(layout);
    return el;
  };
};

Loader.extend(ReaderPage);

module.exports = ReaderPage;