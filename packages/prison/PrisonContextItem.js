import { Component } from 'substance'

class PrisonContextItem extends Component {

  render($$) {
    let urlHelper = this.context.urlHelper
    let node = this.props.data

    let el = $$('div')
      .attr("data-id", this.props.entityId)
      .addClass('sc-entity-entry se-prison')
      .on('click', this.handleClick)

    let location = node.country
    if(node.nearestLocality) {
      location += ", " + node.nearestLocality
    }

    let prisonType = node.prisonType.join(', ')

    let resourceLink = $$('a')
      .addClass('se-resource-external-link se-resource-link')
      .attr({
        href: urlHelper.openResource(this.props.entityId),
        target: '_blank',
        title: this.getLabel('resource-link')
      })
      .append(this.context.iconProvider.renderIcon($$, 'resources'))

    let mapLink = $$('a')
      .addClass('se-resource-external-link se-map-link')
      .attr({
        href: urlHelper.openResource(this.props.entityId),
        target: '_blank',
        title: this.getLabel('map-link')
      })
      .append(this.context.iconProvider.renderIcon($$, 'map-link'))

    el.append(
      $$('div').addClass('se-prison-type').append(prisonType),
      $$('div').addClass('se-location').append(location),
      resourceLink,
      mapLink,
      $$('div').addClass('se-title').append(node.name.toLowerCase() === 'неизвестно' ? this.getLabel('unknown-name') : node.name),
      $$('div').addClass('se-description').setInnerHTML(node.description)
    )

    return el
  }

  handleClick() {
    this.send('switchActive', this.props.entityType, this.props.entityId)
    this.send('showReferences', this.props.entityId)
  }

}

export default PrisonContextItem