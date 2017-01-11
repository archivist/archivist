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
        player.play()
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
    let config = this.context.config
    let el = $$('div').addClass('sc-context-panel')

    if(this.state.type === 'video') {
      let player = $$('div')
        .addClass('se-media')
        .attr({'data-type': 'vimeo', 'data-video-id': this.state.media})

      el.append(player)
    } else if (this.state.type === 'audio') {
      let player = $$('audio')
        .addClass('se-media')
        .attr({controls: true})

      player.append(
        $$('source').attr({
          src: config.mediaServer + '/audio/' + this.state.media + '.mp3',
          type: 'audio/mp3'
        }),
        $$('source').attr({
          src: config.mediaServer + '/audio/' + this.state.media + '.ogg',
          type: 'audio/ogg'
        })
      )

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
