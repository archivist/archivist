'use strict';

import Toolbox from './Toolbox'

export default {
  name: 'archivist-toolbox',
  configure: function(config) {
    config.addComponent('toolbox', Toolbox);
    //config.addStyle(__dirname, '_toolbox');
  }
};