class WhitespaceClenaer {

  clean(tx, containerId) {
    if (!containerId) {
      throw new Error("Argument 'containerId' is mandatory.");
    }
    
    let container = tx.get(containerId)
    let nodes = container.getNodes()

    nodes.forEach(node => {
      if(node.isText()) {
        this.cleanNode(tx, node)
      }
    })
  }

  cleanNode(tx, node) {
    let path = node.getPath()
    let matches = this.detectNodeMatches(tx, path)

    while(matches.length > 0) {
      matches.forEach(match => {
        tx.setSelection(match)
        tx.insertText(' ')
      })
      matches = this.detectNodeMatches(tx, path)
    }
  }

  detectNodeMatches(tx, path) {
    let text = tx.get(path)

    let matcher = new RegExp(' {2}', 'g')
    let matches = []
    let match = matcher.exec(text)

    while (match) {
      let sel = tx.createSelection({
        type: 'property',
        path: path,
        startOffset: match.index,
        endOffset: matcher.lastIndex
      })

      matches.unshift(sel)
      match = matcher.exec(text)
    }
    return matches
  }

}

export default WhitespaceClenaer