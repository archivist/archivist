'use strict';

var seed = function(tx) {
  var body = tx.get('body');

  tx.create({
    id: 'meta',
    type: 'meta',
    title: 'Untitled Interview'
  });

  tx.create({
    id: 'p1',
    type: 'paragraph',
    content: 'Write your note here.'
  });
  body.show('p1');
};

module.exports = seed;