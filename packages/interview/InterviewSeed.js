let seed = function(tx) {
  let body = tx.get('body');

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

export default seed;