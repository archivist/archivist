import { Component, EditorSession } from 'substance'
import { clone, extend } from 'lodash-es'

/*
  Entity Editor
*/
class EntityEditor extends Component {

  didMount() {
    this._loadEntity()
  }

  dispose() {
    let session = this.state.session
    if(session) {
      session.off(this)
      // TODO: Deatach drag listners in more convient way
      session.dragManager.el.removeAllEventListeners()
    }
  }

  render($$) {
    const Button = this.getComponent('button')

    let doc = this.state.doc
    let entity = this.state.entity

    // We should get form component from archivist component registry
    // this way we could get overrided forms
    let configurator = this.context.configurator
    let componentRegistry = configurator.getComponentRegistry()
    let Form = componentRegistry.get('form')
    
    let el = $$('div').addClass('sc-entity-editor')

    if(entity && doc) {
      let entityData = doc.get(entity.entityType)
      let form = $$(Form, {node: entityData, session: this.state.session})

      el.append(
        form,
        $$('div').addClass('se-controls').append(
          $$(Button, {theme: 'round', label: 'entity-editor-cancel'}).addClass('se-cancel')
            .on('click', this._revertEntity),
          $$(Button, {theme: 'round', label: 'entity-editor-ok'}).addClass('se-ok')
            .on('click', this._closeEditor)
        )
      )
    } else {
      el.append('There is no editor for this entity type, sorry')
    }

    return el
  }

  _loadEntity() {
    let entityId = this.props.entityId
    let mainConfigurator = this.context.configurator
    let configurator = mainConfigurator.getConfigurator('archivist-entities')
    let resourceClient = this.context.resourceClient

    resourceClient.getEntity(entityId, (err, entity) => {
      if(err) {
        console.error(err)
        this.setState({
          error: new Error('Entity loading failed')
        })
        return
      }

      let entityType = entity.entityType
      let container = configurator.createDocument()

      if(container.schema.getNodeClass(entityType)) {
        let entityData = {
          id: entityType,
          type: entityType
        }

        entityData = extend(entityData, entity.data)
        container.create(entityData)

        let session = new EditorSession(container, {configurator: configurator})
        session.onUpdate('document', this._onDocumentChange, this)

        const source = clone(entity)

        this.setState({
          doc: container,
          session: session,
          source: source,
          entity: entity
        })
      }
    })
  }

  _updateEntity(data, name, synonyms, description, silent) {
    let authenticationClient = this.context.authenticationClient
    let user = authenticationClient.getUser()
    let entityId = this.props.entityId
    let resourceClient = this.context.resourceClient
    let entityData = {
      data: data,
      name: name,
      synonyms: synonyms,
      description: description
    }

    if(!silent) {
      entityData.updatedBy = user.userId
      entityData.edited = new Date().toISOString()
    }

    // Remove node props
    delete entityData.data.id
    delete entityData.data.type

    resourceClient.updateEntity(entityId, entityData, (err, entity) => {
      if(err) {
        console.error(err);
        this.setState({
          error: new Error('Entity update failed')
        })
        return
      }

      this.send('updateEntity', entity)
    })
  }

  _onDocumentChange() {
    let doc = this.state.doc
    let entity = this.state.entity
    let entityData = doc.get(entity.entityType)
    let entityDataJSON = entityData.toJSON()
    let name = entityData.getName()
    let synonyms = entityData.getSynonyms()
    let description = entityData.getDescription()
    this._updateEntity(entityDataJSON, name, synonyms, description)
  }

  _revertEntity() {
    let entity = this.state.source
    let entityData = entity.data
    let name = entity.name
    let synonyms = entity.synonyms
    let description = entity.description
    this._updateEntity(entityData, name, synonyms, description, true)
    this._closeEditor()
  }

  _closeEditor() {
    this.send('finishEditing')
  }
}

export default EntityEditor
