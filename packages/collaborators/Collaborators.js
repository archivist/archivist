import { Component, Tooltip } from 'substance'

class Collaborators extends Component {

  didMount() {
    let editorSession = this.context.editorSession
    editorSession.on('collaborators:changed', this.rerender, this)
  }

  dispose() {
    let editorSession = this.context.editorSession
    editorSession.off(this)
  }

  render($$) {
    let editorSession = this.context.editorSession
    let collaborators = editorSession.collaborators
    let collaboratorsIds = Object.keys(collaborators)
    let activeCollaborators = collaboratorsIds.filter(c => { return collaborators[c].active })
    
    let el = $$('div').addClass('sc-collaborators')
    activeCollaborators.forEach(collaboratorId => {
      let initials = this._extractInitials(collaborators[collaboratorId])
      el.append(
        $$('div').addClass('se-collaborator').append(
          initials.join(''),
          $$(Tooltip, {text: collaborators[collaboratorId].name || 'Anonymous'})
        ).ref(collaborators[collaboratorId].userId)
      )
    })

    return el
  }

  _extractInitials(collaborator) {
    let name = collaborator.name
    if (!name) {
      return 'A'
    }
    let parts = name.split(' ')
    return parts.map(function(part) {
      return part[0].toUpperCase() // only use the first letter of a part
    })
  }
}

export default Collaborators