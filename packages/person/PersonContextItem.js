import { Component } from 'substance'

class PersonContextItem extends Component {

  render($$) {
    let urlHelper = this.context.urlHelper
    let node = this.props.data

    let el = $$('div')
      .attr("data-id", this.props.entityId)
      .addClass('sc-entity-entry se-person')
      .on('click', this.handleClick)

    let resourceLink = $$('a')
      .addClass('se-resource-external-link se-person-link')
      .attr({
        href: urlHelper.openPerson(this.props.entityId),
        target: '_blank',
        title: this.getLabel('person-link')
      })
      .append(this.context.iconProvider.renderIcon($$, 'person-link'))

    if(node.global) {
      el.append(resourceLink)
    }

    el.append(
      $$('div').addClass('se-title').append(node.name),
      $$('div').addClass('se-description').setInnerHTML(node.description)
    )

    return el
  }

  handleClick() {
    this.send('switchActive', this.props.entityType, this.props.entityId)
    this.send('showReferences', this.props.entityId)
  }

}

export default PersonContextItem