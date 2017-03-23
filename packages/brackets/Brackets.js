import { Component, DefaultDOMElement } from 'substance'
import { forEach } from 'lodash-es'

class Brackets extends Component {

  didMount() {
    // do a full rerender when window gets resized
    DefaultDOMElement.getBrowserWindow().on('resize', this.onResize, this)

    setTimeout(function() {
      this.updateBrackets()
    }.bind(this))
  }

  dispose() {
    DefaultDOMElement.getBrowserWindow().off(this)
  }

  didUpdate() {
    this.updateBrackets()
  }

  render($$) {
    let topics = this.state.topics
    let doc = this.context.doc
    let anchorIndex = doc.getIndex('container-annotations')

    let el = $$('div')
      .addClass('sc-brackets')

    forEach(anchorIndex.annosById.body, (anchor, nodeId) => {
      let reference = anchor.reference
      let bracket = $$('div').addClass('se-bracket')
        .attr({'data-id': nodeId + '-bracket'})
        .ref(nodeId)

      if(topics) {
        let intersection = reference.filter(function(r) {
          return topics.indexOf(r) !== -1
        })

        if(intersection.length > 0) {
          bracket.addClass('sm-active')
        }
      }

      if(this.state.active === nodeId) {
        bracket.addClass('sm-active')
      }

      if(this.props.editor) {
        bracket.on('click', this.toggleBracket.bind(this, anchor))
      }

      el.append(bracket)
    })

    return el
  }

  updateBrackets() {
    let doc = this.context.doc
    let anchorIndex = doc.getIndex('container-annotations')
    let layout = this.getParent()
    let layoutEl = layout.el
    let brackets = {}

    // 3 available slots (0 means not used)
    let bracketSlots = [0,0,0]

    // Collects all events for the sweep algorithm
    let events = []

    forEach(anchorIndex.annosById.body, (anchor, nodeId) => {
      if (!anchor.start || !anchor.end) {
        console.warn("FIXME: Could not find anchors for node ", nodeId)
        return
      }
      let anchors = layoutEl.findAll('*[data-id="'+nodeId+'"]')
      let startAnchorEl = anchors[0]
      let endAnchorEl = anchors[anchors.length - 1]
      if(startAnchorEl !== null && startAnchorEl !== undefined) {
        let startTop = startAnchorEl.el.offsetTop
        let endTop = endAnchorEl.el.offsetTop + endAnchorEl.getOuterHeight()
        let height = endTop - startTop

        // Add start and end events
        events.push({
          nodeId: nodeId,
          pos: startTop,
          type: "start"
        })

        events.push({
          nodeId: nodeId,
          pos: endTop,
          type: "end"
        })

        brackets[nodeId] = {
          top: startTop,
          height: height,
          slot: null
        }
      }
    })


    function bookSlot(nodeId) {
      // Use slot 0 by default
      let minVal = Math.min.apply(null, bracketSlots)
      let slot

      for (let i = 0; i < bracketSlots.length && slot === undefined; i++) {
        let slotVal = bracketSlots[i]
        // Found first suitable slot
        if (slotVal === minVal) {
          slot = i
          bracketSlots[i] = slotVal+1
        }
      }
      // Assign slot to associated bracket
      brackets[nodeId].slot = slot
    }

    function releaseSlot(nodeId) {
      let bracket = brackets[nodeId]
      bracketSlots[bracket.slot] = bracketSlots[bracket.slot] - 1
    }

    // Sort brackets and events
    events = events.sort(function (a, b) {
      return a.pos - b.pos
    })

    // Start the sweep (go through all events)
    forEach(events, function(evt) {
      if (evt.type === "start") {
        bookSlot(evt.nodeId)
      } else {
        releaseSlot(evt.nodeId)
      }
    })

    forEach(brackets, (bracket, nodeId) => {
      let bracketEl = this.refs[nodeId]
      bracketEl.css({
        top: bracket.top,
        height: bracket.height
      })

      bracketEl.removeClass('sm-level-0')
      bracketEl.removeClass('sm-level-1')
      bracketEl.removeClass('sm-level-2')

      bracketEl.addClass('sm-level-' + bracket.slot)
    })
  }

  onResize() {
    this.rerender()
  }

  highlight(topics) {
    this.extendState({
      topics: topics
    })
  }

  toggleBracket(node) {
    let active = this.state.active === node.id ? null : node.id
    this.send('toggleBracket', node, active)
    this.extendState({active: active})
  }
}

export default Brackets