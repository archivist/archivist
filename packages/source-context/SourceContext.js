import { Component } from 'substance'
import moment from 'moment'
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

  shouldRerender(newProps, newState) {
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

    let technicalData = $$('div').addClass('se-technical-info').append(
      this._renderMetaProp($$, 'project_name', 'tech-project_name'),
      this._renderMetaProp($$, 'title', 'tech-interviewee'),
      this._renderMetaProp($$, 'conductor', 'tech-conductor'),
      this._renderMetaProp($$, 'operator', 'tech-operator'),
      this._renderMetaProp($$, 'sound_operator', 'tech-sound_operator'),
      this._renderMetaProp($$, 'interview_location', 'tech-interview_location'),
      this._renderMetaProp($$, 'interview_date', 'tech-interview_date', function(date) {
        return moment(date).format('DD.MM.YYYY')
      })
    )

    el.append(technicalData)

    return el
  }

  _renderMetaProp($$, prop, label, transformer) {
    let doc = this.context.doc
    let metadata = doc.getDocumentMeta()
    let value = metadata[prop]
    if(!value) {
      return
    }
    if(transformer) {
      value = transformer(value)
    }
    return $$('div').addClass('se-meta-prop se-meta-' + prop).append(
      $$('div').addClass('se-meta-label').append(this.getLabel(label)),
      $$('div').addClass('se-meta-value').append(value)
    )
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
    } else {
      this.initialized = true
    }
  }
}

export default SourceContext
