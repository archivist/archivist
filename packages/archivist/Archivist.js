import AbstractApplication from '../common/AbstractApplication'
import ArchivistRouter from './ArchivistRouter'
import { forEach } from 'lodash-es'

/*
  Archivist Application component.
*/
class Archivist extends AbstractApplication {

  constructor(parent, props) {
    super(parent, props)

    if (!props.configurator) {
      throw new Error("'configurator' is required")
    }

    this.configurator = props.configurator
    this.config = this.configurator.getAppConfig()
    this.authenticationClient = this.configurator.getAuthenticationClient()
    this.documentClient = this.configurator.getDocumentClient({authClient: this.authenticationClient})
    this.fileClient = this.configurator.getFileClient()
    this.resourceClient = this.configurator.getResourceClient({authClient: this.authenticationClient})
    this.componentRegistry = this.configurator.getComponentRegistry()
    this.iconProvider = this.configurator.getIconProvider()
    this.labelProvider = this.configurator.getLabelProvider()

    let pages = this.configurator.getPages()
    forEach(pages, function(page) {
      this.addPage(page, this.componentRegistry.get(page))
    }.bind(this))

    this.handleActions({
      'navigate': this.navigate,
      'home': this._home
    })
  }

  getChildContext() {
    return {
      config: this.config,
      configurator: this.configurator,
      authenticationClient: this.authenticationClient,
      documentClient: this.documentClient,
      fileClient: this.fileClient,
      resourceClient: this.resourceClient,
      urlHelper: this.router,
      componentRegistry: this.componentRegistry,
      iconProvider: this.iconProvider,
      labelProvider: this.labelProvider
    }
  }

  getDefaultPage() {
    return 'archive'
  }

  getLoginPage() {
    return 'welcome'
  }

  getRouter() {
    return new ArchivistRouter(this);
  }

  _onAuthentication(route, session) {
    if(!session) {
      route.page = this.getLoginPage()
    } else if (!session.user.name) {
      route.page = 'entername'
    }

    return route
  }

  _home() {
    this.navigate({
      page: this.getDefaultPage()
    })
  }
}

export default Archivist