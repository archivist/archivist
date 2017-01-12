import { Component } from 'substance'
import plyr from 'plyr'

class SourceContext extends Component {

  didMount() {
    let pl = plyr.setup()
    this.player = pl[0]
    this.player.on('ready', () => {
      this._onPlayerLoad()
    })
  }

  didUpdate() {
    let time = this.props.time
    if(time && this.player && this.initialized) {
      let seconds = this.hmsToSecondsOnly(time)
      this.player.seek(seconds)
      this.player.play()
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

  /*
    Rewind player to initial time
    TODO: find a proper way to rewind when video is ready
    we can't relay on plyr's ready event as it fired too early 
  */
  _onPlayerLoad() {
    let time = this.props.time
    if(time) {
      let seconds = this.hmsToSecondsOnly(time)
      setTimeout(() => {
        this.player.seek(seconds)
        this.initialized = true
        setTimeout(() => {
          this.player.pause()
        }, 0)
      }, 1000)
    }
  }
}

export default SourceContext
