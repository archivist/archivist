import { Component, FontAwesomeIcon as Icon } from 'substance'
import moment from 'moment'

class AbstractEntityRow extends Component {

  render($$) {
    const Grid = this.getComponent('grid')

    let urlHelper = this.context.urlHelper
    let item = this.props.item
    let references = this.props.references
    let pageName = this.props.pageName

    let url = urlHelper.openEntity(pageName, item.entityId)
    //let entityIcon = this.renderEntityIcon($$)
    let name = $$('a').attr({href: url}).append(item.name)
    let updatedFromNow = moment(item.edited).fromNow()
    let updatedDateTime = moment(item.edited).format('DD.MM.YYYY HH:mm')
    let edited = this.getLabel('updated-info')
      .replace('fromnow', updatedFromNow)
      .replace('datetime', updatedDateTime)
      .replace('username', item.updatedBy)

    let additionalActions = [
      {label: this.getLabel('edit-action'), action: this._editItem.bind(this, item.entityId)},
      {label: this.getLabel('delete-action'), action: this._removeItem.bind(this, item.entityId)},
      {label: this.getLabel('merge-action'), action: this._mergeItem.bind(this, item.entityId)}
    ]

    let row = $$('div').addClass('se-row se-entity-meta').append(
      //$$(Grid.Cell, {columns: 1}).addClass('se-badge').append(entityIcon),
      $$(Grid.Cell, {columns: 6}).addClass('se-title').append(name),
      $$(Grid.Cell, {columns: 3}).append(edited),
      $$(Grid.Cell, {columns: 2}).append(item.count ? this.getLabel('document-counter').replace('count', item.count) : this.getLabel('document-counter').replace('count', 0)),
      $$(Grid.Cell, {columns: 1}).addClass('se-additional').append(
        this.renderAdditionalMenu($$, additionalActions)
      ).on('click', function(e) {
        e.stopPropagation()
      })
    ).on('click', this._loadReferences.bind(this, item.entityId))

    if(item.description) {
      row.append(
        $$(Grid.Row).addClass('se-entity-description').append(
          $$('div').addClass('se-cell se-description').setInnerHTML(item.description)
        )
      )
    }

    if(this.state.details && references) {
      let subGrid = $$(Grid).addClass('se-sub-grid')
      references.records.forEach(function(reference) {
        let referenceIcon = $$(Icon, {icon: 'fa-file-text-o'})
        let referenceEl = $$(Grid.Row).addClass('se-document-reference').ref(reference.documentId).append(
          $$(Grid.Cell, {columns: 1}).addClass('se-badge').append(referenceIcon),
          $$(Grid.Cell, {columns: 11}).addClass('se-reference').append(reference.title)
        )

        subGrid.append(referenceEl)
      })

      row.append(subGrid)
    }

    return row
  }

  renderAdditionalMenu($$, actions) {
    const Button = this.getComponent('button')

    let el = $$('div').addClass('se-more').attr({'tabindex': 0})
    let actionsList = $$('ul').addClass('se-more-content')
    actions.forEach(action => {
      actionsList.append(
        $$('li').addClass('se-more-item').append(
          $$(Button, {label: action.label}).on('click', action.action)
        )
      )
    })
    el.append(actionsList)

    return el
  }

  _toggleDetails() {
    let details = this.state.details
    this.extendState({details: !details})
  }

  _editItem(id) {
    this.send('editItem', id)
  }

  _removeItem(id) {
    this.send('removeItem', id)
  }

  _mergeItem(id) {
    this.send('mergeItem', id)
  }

  _loadReferences(id, index) {
    this.send('loadReferences', id, index)
  }
}

export default AbstractEntityRow
