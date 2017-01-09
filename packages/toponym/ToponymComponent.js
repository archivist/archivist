import { AnnotationComponent } from 'substance'

class ToponymComponent extends AnnotationComponent {
  render($$) {
    let el = $$('a')
      .attr("data-id", this.props.node.id)
      .attr("href", '#entityId=' + this.props.node.reference)
      .addClass(this.getClassNames())
    if (this.props.node.highlighted) {
      el.addClass('sm-highlighted')
    }
    el.append(this.props.children)
    return el
  }
}

export default ToponymComponent