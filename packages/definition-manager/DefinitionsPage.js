import AbstractEntityPage from '../common/AbstractEntityPage'

class DefinitionsPage extends AbstractEntityPage {
  getInitialState() {
    return {
      edit: false,
      active: {},
      filters: {entityType: 'definition'},
      search: null,
      dialog: false,
      perPage: 30,
      order: 'created',
      direction: 'desc',
      pagination: false,
      items: []
    }
  }
}

DefinitionsPage.pageName = 'definitions'

export default DefinitionsPage
