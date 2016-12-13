import {ContainerAnnotation} from 'substance'
import Subject from './Subject'
import SubjectTool from './SubjectTool'
import SubjectCommand from './SubjectCommand'
import SubjectComponent from './SubjectComponent'

export default {
  name: 'subject',
  configure: function(config) {
    config.addNode(Subject)
    config.addTool(Subject.type, SubjectTool)
    config.addCommand(Subject.type, SubjectCommand, { nodeType: Subject.type })
    //config.addComponent(Subject.type, ContainerAnnotation)
    config.addIcon(Subject.type, {'fontawesome': 'fa-tag'})
  }
}