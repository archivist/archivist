import {ContainerAnnotation} from 'substance'
import SubjectReference from './SubjectReference'
import SubjectTool from './SubjectTool'
import SubjectCommand from './SubjectCommand'
import SubjectComponent from './SubjectComponent'

export default {
  name: 'subject',
  configure: function(config) {
    config.addNode(SubjectReference)
    config.addTool(SubjectReference.type, SubjectTool)
    config.addCommand(SubjectReference.type, SubjectCommand, { nodeType: SubjectReference.type })
    //config.addComponent(Subject.type, ContainerAnnotation)
    config.addIcon(SubjectReference.type, {'fontawesome': 'fa-tag'})
  }
}