'use strict';

import Header from './Header'

export default {
  name: 'archivist-header',
  configure: function(config) {
    config.addComponent('header', Header);
    //config.addStyle(__dirname, '_header');
  }
};