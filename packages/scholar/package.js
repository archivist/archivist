import DocumentPackage from '../document/package'
import PagerPackage from '../pager/package'
import ToolboxPackage from '../toolbox/package'

export default {
  name: 'scholar',
  configure: function(config) {
    config.import(DocumentPackage)

    // config.import(Note);
    // config.import(Dashboard);
    config.import(PagerPackage)
    config.import(ToolboxPackage)
    // //config.import(LoaderPackage);
    // config.import(NotificationPackage);
    // config.import(CollaboratorsPackage);


    // // Default configuration for available modes
    // config.addConfigurator('reader', ReaderConfigurator);
    // config.addConfigurator('writer', WriterConfigurator);
  }
}