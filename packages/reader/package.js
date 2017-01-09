import { BasePackage } from 'substance'
import TabbedContextPackage from '../tabbed-context/package'
import ReaderLayout from './ReaderLayout'

export default {
  name: 'archivist-reader',
  configure: function(config) {
    config.import(BasePackage)
    config.import(TabbedContextPackage)
    config.addComponent('reader', ReaderLayout)
  }
}