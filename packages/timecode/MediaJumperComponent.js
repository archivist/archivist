import { AnnotationComponent } from 'substance'

class MediaJumperComponent extends AnnotationComponent {
  render($$) {
    let time = this.getTime()
    let el = $$('a')
      .attr("data-id", this.props.node.id)
      .attr("href", '#time=' + time)
      .addClass(this.getClassNames())

    el.append(this.props.children)
    return el
  }

  getTime() {
    let node = this.props.node
    let content = node.getText()
    let regex = /\{([^}]+)\}/
    let timecode = content.match(regex)
    if(timecode !== null) {
      timecode = timecode[1]
    } else {
      timecode = '00:00:00'
    }

    return timecode
  }

  getClassNames() {
    return 'sc-media-jumper'
  }
}

export default MediaJumperComponent