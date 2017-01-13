import { Component, DefaultDOMElement } from 'substance'
import plyr from 'plyr'

class SourcePlayerOverlay extends Component {

  didMount() {
    // recalculate width when window gets resized
    DefaultDOMElement.getBrowserWindow().on('resize', this._updateWidth, this)

    let pl = plyr.setup()
    this.player = pl[0]
    this.player.on('ready', () => {
      this._onPlayerLoad()
    })
  }

  dispose() {
    DefaultDOMElement.getBrowserWindow().off(this)
  }

  willReceiveProps(newProps) {
    let oldTime = this.props.time
    let time = newProps.time
    let timeChanged = oldTime !== time
    if(time && timeChanged && this.initialized) {
      let seconds = this.hmsToSecondsOnly(time)
      this.player.seek(seconds)
      this.player.play()
    }
  }

  didUpdate() {
    let currentContext = this.props.currentContext
    let boundContext = this.props.boundContext
    if(currentContext === boundContext) {
      this._showPlayer()
    } else {
      this._hidePlayer()
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

  shouldRerender() {
    return false
  }

  render($$) {
    let config = this.context.config
    let el = $$('div').addClass('sc-overlay-player')

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
    this._updateWidth()
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
    } else {
      this.initialized = true
    }
  }

  _updateWidth() {
    let contextPanel = this.getParent()
    let contextWidth = contextPanel.el.getWidth()
    this.el.css({width: contextWidth})
  }

  _showPlayer() {
    this.el.css({visibility: 'visible'})
  }

  _hidePlayer() {
    this.el.css({visibility: 'hidden'})
  }
}

export default SourcePlayerOverlay
