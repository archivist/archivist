import { Component } from 'substance'
import plyr from 'plyr'

class SourceContext extends Component {

  didMount() {
    plyr.setup()
  }

  didUpdate() {
    let time = this.props.time
    if(time) {
      let player = plyr.get()
      player = player[0]
      if(player) {
        let seconds = this.hmsToSecondsOnly(time)
        player.seek(seconds)
      }
    }
  }

  getInitialState() {
    let doc = this.context.doc
    let meta = doc.getDocumentMeta()

    return {
      type: meta.record_type,
      media: meta.media_id
    }
  }

  shouldRerender(newProps, newState) { // eslint-disable-line
    return false
  }

  render($$) {
    let el = $$('div').addClass('sc-context-panel')

    if(this.state.type === 'video') {
      //<div data-type="youtube" data-video-id="bTqVqk7FSmY"></div
      let player = $$('div')
        .addClass('se-media')
        .attr({'data-type': 'vimeo', 'data-video-id': this.state.media})

      el.append(player)
    }

    return el
  }

  hmsToSecondsOnly(str) {
    let p = str.split(':'), s = 0, m = 1

    while (p.length > 0) {
      s += m * parseInt(p.pop(), 10)
      m *= 60
    }

    return s
  }
}

export default SourceContext
