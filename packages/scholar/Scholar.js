import AbstractApplication from '../common/AbstractApplication'
import ScholarRouter from './ScholarRouter'
import cloneDeep from 'lodash/cloneDeep'
import forEach from 'lodash/forEach'

/*
  Archivist Scholar Application component.
*/
class Scholar extends AbstractApplication {

  constructor(parent, props) {
    super(parent, props)

    if (!props.configurator) {
      throw new Error("'configurator' is required")
    }

    this.configurator = props.configurator
    this.config = this.configurator.getAppConfig()
    this.documentClient = this.configurator.getDocumentClient()
    this.resourceClient = this.configurator.getResourceClient()
    this.componentRegistry = this.configurator.getComponentRegistry()
    this.iconProvider = this.configurator.getIconProvider()
    this.labelProvider = this.configurator.getLabelProvider()

    let pages = this.configurator.getPages()
    forEach(pages, function(page) {
      this.addPage(page, this.componentRegistry.get(page))
    }.bind(this))

    this.handleActions({
      'navigate': this.navigate,
      'home': this._home,
      'changeLanguage': this._changeLanguage
    })
  }

  getChildContext() {
    return {
      config: this.config,
      configurator: this.configurator,
      documentClient: this.documentClient,
      resourceClient: this.resourceClient,
      urlHelper: this.router,
      componentRegistry: this.componentRegistry,
      iconProvider: this.iconProvider,
      labelProvider: this.labelProvider
    }
  }

  navigate(route, opts) {
    this.extendState({
      route: route
    })

    this.router.writeRoute(route, opts)
  }

  getDefaultPage() {
    return 'explorer'
  }

  getRouter() {
    return new ScholarRouter(this, {
      'documents': 'documentId',
      'resources': 'resourceId'
    });
  }

  _getSubjects() {
    return this.subjects
  }

  _getPageProps() {
    let props = cloneDeep(this.state.route)
    delete props.page
    props.preview = true
    props.mobile = this.state.mobile
    return props
  }

  _home() {
    this.navigate({
      page: this.getDefaultPage()
    })
  }

  _changeLanguage(lang) {
    this.configurator.setDefaultLanguage(lang)
    this.labelProvider = this.configurator.getLabelProvider()
    this.rerender()
  }

}

export default Scholar