'use strict';

import { Component, Layout, SubstanceError as Err } from 'substance'
import Item from './Item'

// Sample data for debugging
import DataSample from '../../data/docs'

function DocumentsPage() {
  Component.apply(this, arguments);
}

DocumentsPage.Prototype = function() {

  this.didMount = function() {
    this._loadData();
  };

  this.willReceiveProps = function() {
    this._loadData();
  };

  this.render = function($$) {
    var documentItems = this.state.documentItems;
    var el = $$('div').addClass('sc-document-list');

    var header = this.renderHeader($$);
    el.append(header);

    var toolbox = this.renderToolbox($$);
    el.append(toolbox);

    if (!documentItems) {
      return el;
    }

    if (documentItems.length > 0) {
      el.append(this.renderFull($$));
    } else {
      el.append(this.renderEmpty($$));
    }
    return el;
  };

  this.renderHeader = function($$) {
    var componentRegistry = this.context.componentRegistry;
    var Header = componentRegistry.get('header');

    return $$(Header);
  };

  this.renderToolbox = function($$) {
    var componentRegistry = this.context.componentRegistry;
    var Toolbox = componentRegistry.get('toolbox');

    var toolbox = $$(Toolbox, {
      actions: {
        'newDocument': 'New Document'
      }
    });

    return toolbox;
  };

  this.renderStatusBar = function($$) {
    var componentRegistry = this.context.componentRegistry;
    var StatusBar = componentRegistry.get('status-bar');

    return $$(StatusBar);
  };

  this.renderEmpty = function($$) {
    var layout = $$(Layout, {
      width: 'medium',
      textAlign: 'center'
    });

    layout.append(
      $$('h1').html(
        'No results'
      ),
      $$('p').html('Sorry, no documents matches your query')
    );

    return layout;
  };

  this.renderFull = function($$) {
    var documentItems = this.state.documentItems;
    var layout = $$(Layout, {
      width: 'full',
      noPadding: true
    });

    // layout.append(
    //   $$('div').addClass('se-intro').append(
    //     $$('div').addClass('se-note-count').append(
    //       'Showing ',
    //       documentItems.length.toString(),
    //       ' notes'
    //     ),
    //     $$(Button).addClass('se-new-note-button').append('New Note')
    //       .on('click', this.send.bind(this, 'newNote'))
    //   )
    // );

    if (documentItems) {
      documentItems.forEach(function(documentItem) {
        layout.append(
          $$(Item, documentItem)
        );
      });
    }
    return layout;
  };

  /*
    Loads documents
  */
  this._loadData = function() {
    // Sample data for debugging

    this.extendState({
      documentItems: DataSample
    });

    // var documentClient = this.context.documentClient;

    // documentClient.listDocuments(function(err, docs) {
    //   if (err) {
    //     this.setState({
    //       error: new Err('DocumentsPage.LoadingError', {
    //         message: 'Documents could not be loaded.',
    //         cause: err
    //       })
    //     });
    //     console.error('ERROR', err);
    //     return;
    //   }

    //   this.extendState({
    //     documentItems: docs
    //   });
    // }.bind(this));
  };
};

Component.extend(DocumentsPage);

export default DocumentsPage;