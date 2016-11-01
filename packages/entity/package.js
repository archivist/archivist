'use strict';

import EntitiesContext from './EntitiesContext'

export default {
  name: 'archivist-entities',
  configure: function(config) {
    config.addContext('entities', EntitiesContext, true)
  }
}