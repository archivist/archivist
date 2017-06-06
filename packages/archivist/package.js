import { DocumentPackage, EntityEditorPackage, HeaderPackage, PagerPackage, ResourceOperatorPackage, SpinnerPackage, ToolboxPackage, WelcomePackage } from 'archivist'

export default {
  name: 'archivist',
  configure: function(config) {
    // Default packages
    config.import(DocumentPackage)
    config.import(EntityEditorPackage)
    config.import(HeaderPackage)
    config.import(PagerPackage)
    config.import(ResourceOperatorPackage)
    config.import(SpinnerPackage)
    config.import(ToolboxPackage)
    config.import(WelcomePackage)


    // // Default configuration for available modes
    // config.addConfigurator('reader', ReaderConfigurator);
    // config.addConfigurator('writer', WriterConfigurator);
  }
}