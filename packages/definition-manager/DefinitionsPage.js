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
      page: 1,
      order: 'created',
      direction: 'desc',
      items: []
    }
  }
}

export default DefinitionsPage
