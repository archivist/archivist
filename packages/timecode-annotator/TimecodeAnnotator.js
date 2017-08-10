import { uuid } from 'substance'
import { forEach } from 'lodash-es'

class TimecodeAnnotator {
  constructor() {
    this.timecodesMap = {}
  }

  start(tx, containerId) {
    if (!containerId) {
      throw new Error("Argument 'containerId' is mandatory.");
    }
    
    let container = tx.get(containerId)
    let nodes = container.getNodes()

    this._createExistingTimecodesMap(tx)

    nodes.forEach(node => {
      if(node.isText()) {
        this.annotateTimecodes(tx, node)
      }
    })
  }

  annotateTimecodes(tx, node) {
    let path = node.getPath()
    let matches = this.detectTimecodes(tx, path)

    while(matches.length > 0) {
      matches.forEach(match => {
        tx.create(match)

        tx.setSelection({
          type: 'property',
          path: match.start.path,
          startOffset: 0,
          endOffset: 0
        })

        if(!this.timecodesMap[path[0]]) {
          this.timecodesMap[path[0]] = [];
        }
        this.timecodesMap[path[0]].push({
          startOffset: match.start.offset,
          endOffset: match.end.offset
        })
      })
      matches = this.detectTimecodes(tx, path)
    }
  }

  detectTimecodes(tx, path) {
    let text = tx.get(path)

    let matcher = new RegExp("{(.+?)}", "g")
    let matches = []
    let match = matcher.exec(text)

    while (match) {
      let exists = this._checkForExistingTimecode(path, match.index)
      if(!exists) {
        let timecode = {
          type: 'timecode',
          start: {
            path: path,
            offset: match.index
          },
          end: {
            path: path,
            offset: matcher.lastIndex,
          },
          id: uuid('timecode')
        }

        matches.unshift(timecode)
      }
      match = matcher.exec(text)
    }
    return matches
  }

  _createExistingTimecodesMap(tx) {
    let annotationsIndex = tx.getIndex('annotations')
    let timecodes = annotationsIndex.byType.timecode
    if(timecodes) {
      forEach(timecodes, tc => {
        let path = tc.getPath()

        if(!this.timecodesMap[path[0]]) {
          this.timecodesMap[path[0]] = []
        }

        this.timecodesMap[path[0]].push({
          startOffset: tc.start.offset,
          endOffset: tc.end.offset
        })
      })
    }
  }

  _checkForExistingTimecode(path, startOffset) {
    // If there's no such node in existing timecodes map, then it's new timecode
    if(!this.timecodesMap[path[0]]) {
      return false
    } else {
      // If there's node inside timecodes map, then we try to find timecode using startOffset
      let exists = false
      let nodeTimecodes = this.timecodesMap[path[0]]
      let timecode = nodeTimecodes.find(tc => {
        return tc.startOffset === startOffset
      })
      if(timecode) exists = true
      return exists
    }
  }

}

export default TimecodeAnnotator