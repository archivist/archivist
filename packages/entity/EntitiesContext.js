import { Component } from 'substance'
import filter from 'lodash/filter'

class EntitiesContext extends Component {

  // didMount() {
  //   let tocProvider = this.context.tocProvider
  //   tocProvider.on('toc:updated', this.onTOCUpdated, this)
  // }

  // dispose() {
  //   let tocProvider = this.context.tocProvider
  //   tocProvider.off(this)
  // }

  getEntries(entityType) {
    let editorSession = this.context.editorSession
    let resources = editorSession.resources
    let entries = filter(resources, {entityType: entityType})
    
    return entries
  }

  getEntityRender(entityType) {
    let configurator = this.props.configurator
    return configurator.getContextItem(entityType)
  }

  render($$) {
    // let tocProvider = this.context.tocProvider
    // let activeEntry = tocProvider.activeEntry
    let ScrollPane = this.getComponent('scroll-pane')

    let entityEntries = $$("div")
      .addClass("se-entity-entries")
      .ref('entityEntries')

    let entries = this.getEntries('person')

    for (let i = 0; i < entries.length; i++) {
      let entry = entries[i]

      let EntityComp = this.getEntityRender(entry.entityType)

      entityEntries.append(
        $$(EntityComp, entry).ref(entry.entityId)
      )

      // let entityEntryEl = $$('a')
      //   .addClass('se-entity-entry')
      //   .attr({
      //     href: "#",
      //     "data-id": entry.id,
      //   })
      //   .ref(entry.id)
      //   .on('click', this.handleClick)
      //   .append(
      //     $$(Icon, {icon: 'fa-caret-right'}),
      //     entry.name
      //   );
      // if (activeEntry === entry.id) {
      //   tocEntryEl.addClass("sm-active")
      // }
      // tocEntries.append(tocEntryEl)
    }

    let el = $$('div').addClass('sc-entity-panel').append(
      $$(ScrollPane).ref('panelEl').append(
        entityEntries
      )
    )
    return el
  }

  getDocument() {
    return this.context.doc
  }

  onTOCUpdated() {
    this.rerender()
  }

  handleClick(e) {
    let nodeId = e.currentTarget.dataset.id
    e.preventDefault()
    this.send('tocEntrySelected', nodeId)
  }

}

EntitiesContext.icon = 'fa-bullseye'

EntitiesContext.title = 'Entities'

export default EntitiesContext