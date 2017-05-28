export default {

  type: 'xref',
  tagName: 'span',

  matchElement: function(el) {
    return el.is('span') && el.attr('data-type') === 'xref'
  }

}
