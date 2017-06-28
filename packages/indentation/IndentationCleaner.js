class IndentationClenaer {

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
    let text = tx.get(path)

    while(this.detectWhitespace(text) === 0) {
      tx.setSelection({
        type: 'property',
        path: path,
        startOffset: 0,
        endOffset: 1
      })
      tx.deleteSelection()
      text = tx.get(path)
    }
  }

  detectWhitespace(text) {
    return text.indexOf(' ')
  }

}

export default IndentationClenaer