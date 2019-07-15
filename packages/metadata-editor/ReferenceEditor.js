import { Component, FontAwesomeIcon as Icon } from 'substance'
import { find } from 'lodash-es'

class ReferenceEditor extends Component {
  constructor(...args) {
    super(...args)

    this.handleActions({
      'selectEntity': this._onEntitySelect,
      'closeResourceOperator': this._toggleDialog
    })
  }

  dispose() {
    super.dispose.call(this)
    this.context.editorSession.off(this)
  }

  didMount() {
    let doc = this.context.doc
    let path = this.getPath()
    let value = doc.get(path)
    if(!this.props.multi) {
      value = [value]
    }

    if(value.length > 0) {
      this._loadResources(value, err => {
        if(err) console.error(err)
        this.setValue(value)
      })
    } else {
      this.setValue(value)
    }
     
    this.context.editorSession.onRender('document', this._onDocumentChange, this)
  }

  render($$) {
    let el = $$('div').addClass('sc-reference-editor')
    let tagsWidget = $$('div').addClass('se-tag')
    let openDialog = this.state.openDialog || false
    let values = this.state.value || []
    if(!this.props.multi && values.constructor !== Array) {
      values = [this.state.value]
    }

    if(values) {
      values.forEach(value => {
        if(value) {
          let entry = this.getEntry(value)
          let label = entry ? entry.name : 'unknown entity'
          let item = $$('div').addClass('se-value')
            .append(label)
            .on('click', this._removeValue.bind(this, value))

          if(this.state.highlighted === value) {
            item.addClass('se-hihglight-remove')
          }

          tagsWidget.append(item)
        }
      })
    }

    if(openDialog) {
      const Modal = this.getComponent('modal')
      const ResourceOperator = this.getComponent('resource-operator')
      el.append(
        $$(Modal, {
          width: 'medium'
        }).append(
          $$(ResourceOperator, {mode: 'search', entityType: this.props.entityType})
        ).ref('modal')
      )
    }

    el.append(
      $$('div').addClass('se-toggle-dialog').append(
        $$(Icon, {icon: 'fa fa-filter'})
      ).on('click', this._toggleDialog),
      tagsWidget
    )

    return el
  }

  setValue(value) {
    this.extendState({value: value})
  }

  getValue() {
    return this.state.value
  }

  getPath() {
    return this.props.path
  }

  getEntry(entityId) {
    let editorSession = this.context.editorSession
    let resources = editorSession.resources
    let entry = find(resources, r => {return r.entityId === entityId})
    if(entry) return entry
  }

  _onChange() {
    let editorSession = this.context.editorSession
    let path = this.getPath()
    let value = this.getValue()
    editorSession.transaction(tx => {
      tx.set(path, value)
    })
  }

  _onDocumentChange(update) {
    let path = this.getPath()
    if (update.updated[path]) {
      let doc = this.context.doc
      let value = doc.get(path)
      this.setValue(value)
    }
  }

  _getAndStoreEntity(entityId, cb) {
    let resources = this.context.editorSession.resources
    let entity = find(resources, item => { return item.entityId === entityId })
    if(entity) {
      return cb(null, entity)
    } else {
      let resourceClient = this.context.resourceClient
      resourceClient.getEntity(entityId, (err, entity) => {
        if (err) return cb(err)
        resources.push(entity)
        return cb(null, entity)
      })
    }
  }

  _onEntitySelect(entityId) {
    let editorSession = this.context.editorSession
    let currentValue = this.getValue() || []

    editorSession._send({
      scope: "substance/collab",
      type: "resourceSync",
      documentId: editorSession.documentId,
      resourceId: entityId,
      mode: 'add'
    })

    this._getAndStoreEntity(entityId, (err, entity) => {
      if(this.props.multi) {
        currentValue.push(entity.entityId)
        this.setValue(currentValue)
      } else {
        this.setValue(entity.entityId)
      }

      this._onChange()
    })
  }

  _toggleDialog(e) {
    if(e) e.stopPropagation()
    let current = this.state.openDialog || false
    this.extendState({openDialog: !current})
  }

  _removeValue(value, e) {
    e.stopPropagation()
    let highlighted = this.state.highlighted
    if(highlighted === value) {
      this._deleteValue(value)
    } else {
      this.extendState({highlighted: value})
    }
  }

  _deleteValue(value) {
    let values = this.state.value
    if(this.props.multi) {
      let pos = values.indexOf(value)
      values.splice(pos, 1)
    } else {
      values = ''
    }
    this.extendState({value: values, highlighted: undefined})
    this._onChange()
  }

  _loadResources(entityIds, cb) {
    let editorSession = this.context.editorSession
    let resourceClient = this.context.resourceClient
    resourceClient.listEntities({entityId: entityIds}, {}, (err, entities) => {
      if(err) return cb(err)
      entities.records.forEach(rec => {
        let entity = find(editorSession.resources, item => { return item.entityId === rec.entityId })
        if(!entity) {
          editorSession.resources.push({name: rec.name, entityId: rec.entityId, entityType: rec.entityType})
        }
      })
      return cb()
    })
  }
}

export default ReferenceEditor
