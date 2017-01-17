import ArchivistStorePackage from '../store/package'
import AuthEnginePackage from './auth/package'
import DocumentEnginePackage from './document/package'
//import MailerEnginePackage from './mailer/package'
import ResourceEnginePackage from './resource/package'
import SnapshotEnginePackage from './snapshot/package'

export default {
  name: 'engine',
  configure: function(config) {
    config.import(ArchivistStorePackage)
    //config.import(MailerEnginePackage)
    config.import(AuthEnginePackage)
    config.import(SnapshotEnginePackage)
    config.import(DocumentEnginePackage)
    config.import(ResourceEnginePackage)
  }
}