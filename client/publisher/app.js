import { substanceGlobals } from 'substance'
import Package from './package'
import Archivist from '../../packages/archivist/Archivist'
import ArchivistConfigurator from '../../packages/archivist/ArchivistConfigurator'

substanceGlobals.DEBUG_RENDERING = true;
var configurator = new ArchivistConfigurator().import(Package);

window.onload = function() {
  window.app = Archivist.mount({
    configurator: configurator
  }, document.body);
};