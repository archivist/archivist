import DocumentPackage from '../document/package'
import HeaderPackage from '../header/package'
import PagerPackage from '../pager/package'
import ToolboxPackage from '../toolbox/package'
import WelcomePackage from '../welcome/package'

export default {
  name: 'archivist',
  configure: function(config) {
    config.import(DocumentPackage)

    // config.import(Note);
    // config.import(Dashboard);
    config.import(HeaderPackage)
    config.import(PagerPackage)
    config.import(ToolboxPackage)
    // //config.import(LoaderPackage);
    // config.import(NotificationPackage);
    // config.import(CollaboratorsPackage);
    config.import(WelcomePackage)


    // // Default configuration for available modes
    // config.addConfigurator('reader', ReaderConfigurator);
    // config.addConfigurator('writer', WriterConfigurator);
  }
}