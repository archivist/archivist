import AbstractEntityPage from '../common/AbstractEntityPage'

class PersonsPage extends AbstractEntityPage {
  getInitialState() {
    return {
      edit: false,
      active: {},
      filters: {entityType: 'person'},
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

export default PersonsPage
