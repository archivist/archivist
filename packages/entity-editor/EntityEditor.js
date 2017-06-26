import { Component, EditorSession } from 'substance'
import { extend } from 'lodash-es'

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
    let doc = this.state.doc
    let entity = this.state.entity

    // We should get form component from archivist component registry
    // this way we could get overrided forms
    let configurator = this.context.configurator
    let componentRegistry = configurator.getComponentRegistry()
    let Form = componentRegistry.get('form')
    
    let el = $$('div').addClass('sc-entity-editor')

    el.append(
      $$('div').addClass('se-close-modal').append(
        $$('i').addClass('fa fa-close')
      ).on('click', this._closeEditor)
    )

    if(entity && doc) {
      let entityData = doc.get(entity.entityType)
      let form = $$(Form, {node: entityData, session: this.state.session})

      el.append(form)
    } else {
      el.append('There is no editor for this entity class, sorry')
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
      let container = configurator.createArticle()

      if(container.schema.getNodeClass(entityType)) {
        let entityData = {
          id: entityType,
          type: entityType
        }

        entityData = extend(entityData, entity.data)
        container.create(entityData)

        let session = new EditorSession(container, {configurator: configurator})
        session.onUpdate('document', this._onDocumentChange, this)

        this.setState({
          doc: container,
          session: session,
          entity: entity
        })
      }
    })
  }

  _updateEntity(data, name, synonyms, description) {
    let entityId = this.props.entityId
    let resourceClient = this.context.resourceClient
    let entityData = {
      data: data.toJSON(),
      name: name,
      synonyms: synonyms,
      description: description
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
    let name = entityData.getName()
    let synonyms = entityData.getSynonyms()
    let description = entityData.getDescription()
    this._updateEntity(entityData, name, synonyms, description)
  }

  _closeEditor() {
    this.send('closeModal')
  }
}

export default EntityEditor
