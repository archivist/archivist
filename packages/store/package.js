import ChangeStorePackage from './change/package'
import DocumentStorePackage from './document/package'
import EntityStorePackage from './entity/package'
import FragmentStorePackage from './fragment/package'
import SessionStorePackage from './session/package'
import SnapshotStorePackage from './snapshot/package'
import UserStorePackage from './user/package'

export default {
  name: 'store',
  configure: function(config) {
    config.import(ChangeStorePackage)
    config.import(DocumentStorePackage)
    config.import(EntityStorePackage)
    config.import(FragmentStorePackage)
    config.import(SessionStorePackage)
    config.import(SnapshotStorePackage)
    config.import(UserStorePackage)
  }
}