import { Component } from 'substance'

class EntitiesContext extends Component {

  // didMount() {
  //   let tocProvider = this.context.tocProvider
  //   tocProvider.on('toc:updated', this.onTOCUpdated, this)
  // }

  // dispose() {
  //   let tocProvider = this.context.tocProvider
  //   tocProvider.off(this)
  // }

  getEntries() {
    return [
      {
        entity_id: '1', 
        type: 'person',
        data: {
          name: 'Test person',
          global: false,
          description: 'Person description'
        }
      },
      {
        entity_id: '2',
        type: 'definition',
        data: {
          title: 'Test definition',
          synonyms: ['test, definition'],
          definition_type: 'Test def type',
          description: 'Definition description'
        }
      }
    ]
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

    let entries = this.getEntries()

    for (let i = 0; i < entries.length; i++) {
      let entry = entries[i]

      let EntityComp = this.getEntityRender(entry.type)

      entityEntries.append(
        $$(EntityComp, entry).ref(entry.entity_id)
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