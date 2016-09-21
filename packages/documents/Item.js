'use strict';

import { Component, FontAwesomeIcon as Icon } from 'substance'
//import moment from 'moment';

function Item() {
  Component.apply(this, arguments);
}

Item.Prototype = function() {

  this.render = function($$) {
    var el = $$('div').addClass('sc-document-item');

    var urlHelper = this.context.urlHelper;
    var url = urlHelper.openDocument(this.props.documentId);

    // Icon
    el.append(
      $$('div').addClass('se-badge').append(
        $$(Icon, {icon: 'fa-file-text-o'})
      )
    );


    // // Creator + collaborators | updatedAt
    // var authors = [];
    // authors.push($$('strong').append(this.props.creator || 'Anonymous'));
    // if (this.props.collaborators.length > 0) {
    //   authors.push(' with ');
    //   authors.push(this.props.collaborators.join(', '));
    // }

    var updatedAt = [
      'Updated ',
      this.props.updatedAt,
      //moment(this.props.updatedAt).fromNow(),
      'by',
      this.props.updatedBy || 'Anonymous'
    ];

    el.append(
      $$('div').addClass('se-meta').append(
        $$('div').addClass('se-title')
          .append(
            $$('a')
              .attr({href: url})
              .append(this.props.title)
          ),
        //$$('span').addClass('se-meta-item se-authors').append(authors),
        $$('span').addClass('se-meta-item se-updated-at').append(updatedAt.join(' '))
        // $$('button').addClass('se-meta-item se-delete').append('Delete')
        //   .on('click', this.send.bind(this, 'deleteNote', this.props.documentId))
      )
    );

    el.append(
      $$('div').addClass('se-more').append(
        $$(Icon, {icon: 'fa-ellipsis-v'})
      )
    )

    return el;
  };
};

Component.extend(Item);

export default Item;