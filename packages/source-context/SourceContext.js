import { Component, DefaultDOMElement } from 'substance'
import moment from 'moment'

class SourceContext extends Component {

  didMount() {
    // recalculate width when window gets resized
    DefaultDOMElement.getBrowserWindow().on('resize', this._updatePosition, this)
    this._updatePosition()
  }

  dispose() {
    DefaultDOMElement.getBrowserWindow().off(this)
  }

  didUpdate() {
    this._updatePosition()
  }

  render($$) {
    let el = $$('div').addClass('sc-context-panel')

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

  _updatePosition() {
    let readerContext = this.context.readerContext
    let player = readerContext.getPlayer()
    let playerHeight = player.el.getHeight()
    this.el.css({top: playerHeight})
  }
}

export default SourceContext
