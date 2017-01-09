import { substanceGlobals } from 'substance'
import Package from './package'
import Scholar from '../../packages/scholar/Scholar'
import ScholarConfigurator from '../../packages/scholar/ScholarConfigurator'

substanceGlobals.DEBUG_RENDERING = true;
let configurator = new ScholarConfigurator().import(Package);

window.onload = function() {
  window.app = Scholar.mount({
    configurator: configurator
  }, document.body);
};