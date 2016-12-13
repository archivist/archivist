import AbstractEntityPage from '../common/AbstractEntityPage'

class PrisonsPage extends AbstractEntityPage {
  getInitialState() {
    return {
      edit: false,
      active: {},
      filters: {entityType: 'prison'},
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

export default PrisonsPage
