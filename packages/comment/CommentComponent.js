'use strict';

var Component = require('substance/ui/Component');
var TextProperty = require('substance/ui/TextPropertyComponent');
var Icon = require('substance/ui/FontAwesomeIcon');
var moment = require('moment');

function CommentComponent() {
  Component.apply(this, arguments);
}

CommentComponent.Prototype = function() {

  this.render = function($$) {
    var author = this.props.node.author;
    var date = moment(this.props.createdAt).fromNow();
    var authored = '<strong>' + author + '</strong> ' + date;

    return $$('div')
      .addClass('sc-comment')
      .attr("data-id", this.props.node.id)
      .append(
        $$('div')
          .addClass('se-comment-symbol')
          .attr({contenteditable: false}).append(
            $$(Icon, {icon: "fa-comment"})
          ),
        $$('div')
          .addClass('se-authored')
          .attr('contenteditable', false)
          .html(authored),
        $$('div').addClass('se-body').append(
          $$(TextProperty, {
            doc: this.props.node.getDocument(),
            path: [ this.props.node.id, "content"],
          })
        )
      );
  };

  this.getDate = function() {
    var date = this.props.node.createdAt;
    var result = this.timeSince(new Date(date)) + ' ago';
    return result;
  };
};

Component.extend(CommentComponent);

module.exports = CommentComponent;
