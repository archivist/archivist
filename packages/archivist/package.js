import { ButtonPackage, GridPackage, InputPackage, LayoutPackage, ModalPackage } from 'substance'
import { DocumentPackage, EntityEditorPackage, HeaderPackage, NotificationPackage, PagerPackage, ResourceOperatorPackage, SpinnerPackage, ToolboxPackage, WelcomePackage } from 'archivist'

export default {
  name: 'archivist',
  configure: function(config) {
    // Substance UI packages
    config.import(ButtonPackage)
    config.import(GridPackage)
    config.import(InputPackage)
    config.import(LayoutPackage)
    config.import(ModalPackage)

    // Default packages
    config.import(DocumentPackage)
    config.import(EntityEditorPackage)
    config.import(HeaderPackage)
    config.import(NotificationPackage)
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