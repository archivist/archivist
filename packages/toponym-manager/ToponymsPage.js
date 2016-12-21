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
      order: 'created',
      direction: 'desc',
      pagination: false,
      items: []
    }
  }
}

ToponymsPage.pageName = 'toponyms'

export default ToponymsPage
