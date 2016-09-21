'use strict';

import DocumentsPage from './DocumentsPage';

export default {
  name: 'archivist-documents',
  configure: function(config) {
    config.addComponent('documents', DocumentsPage);
    config.addPage('documents');
  }
};