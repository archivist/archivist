import { BasePackage } from 'substance'
import BracketsPackage from '../brackets/package'
import TabbedContextPackage from '../tabbed-context/package'
import ReaderLayout from './ReaderLayout'

export default {
  name: 'archivist-reader',
  configure: function(config) {
    config.import(BasePackage)
    config.import(BracketsPackage)
    config.import(TabbedContextPackage)
    config.addComponent('reader', ReaderLayout)
  }
}