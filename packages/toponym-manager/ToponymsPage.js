import AbstractEntityPage from '../common/AbstractEntityPage'

class ToponymsPage extends AbstractEntityPage {
  getInitialState() {
    return {
      edit: false,
      active: {},
      filters: {entityType: 'toponym'},
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

export default ToponymsPage
