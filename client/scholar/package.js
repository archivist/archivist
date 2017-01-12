import { ProseArticle } from 'substance'
import ScholarPackage from '../../packages/scholar/package'
import ExplorerPackage from '../../packages/explorer/package'
import SubjectsPackage from '../../packages/subjects/package'
import ReaderPackage from '../../packages/reader/package'
import InterviewPackage from '../../packages/interview/package'
import SourceContextPackage from '../../packages/source-context/package'
import ResourcesContextPackage from '../../packages/resources-context/package'
import SubjectsContextPackage from '../../packages/subjects-context/package'
import InfoContextPackage from '../../packages/info-context/package'
import ScholarSubConfigurator from '../../packages/scholar/ScholarSubConfigurator'
import DocumentClient from './DocumentClient'
import ResourceClient from './ResourceClient'

// Entities definitions
import Definition from '../../packages/definition/Definition'
import Person from '../../packages/person/Person'
import Prison from '../../packages/prison/Prison'
import Toponym from '../../packages/toponym/Toponym'

let appConfig = 'ARCHIVISTCONFIG'
appConfig = JSON.parse(appConfig)

export default {
  name: 'archivist-scholar',
  configure: function(config) {
    // Use the default Archivist package
    config.import(ScholarPackage)
    config.import(ExplorerPackage)


    // Add subconfigurators
    // Reader subconfigurator
    let ReaderConfigurator = new ScholarSubConfigurator()
    ReaderConfigurator.import(ReaderPackage)
    ReaderConfigurator.import(InterviewPackage)
    ReaderConfigurator.import(SourceContextPackage)
    ReaderConfigurator.import(SubjectsContextPackage)
    ReaderConfigurator.import(ResourcesContextPackage)
    ReaderConfigurator.import(InfoContextPackage)
    ReaderConfigurator.setResourceTypes([
      {id: 'toponym', name: 'toponym-resources'},
      {id: 'prison', name: 'prison-resources'},
      {id: 'person', name: 'person-resources'},
      {id: 'definition', name: 'definition-resources'}
    ])
    ReaderConfigurator.setDefaultLanguage(appConfig.defaultLanguage)
    config.addConfigurator('archivist-interview-reader', ReaderConfigurator)

    // Entities subconfigurator
    let EntitiesConfigurator = new ScholarSubConfigurator()
    EntitiesConfigurator.defineSchema({
      name: 'archivist-entities',
      ArticleClass: ProseArticle
    })
    EntitiesConfigurator.addNode(Definition)
    EntitiesConfigurator.addNode(Person)
    EntitiesConfigurator.addNode(Prison)
    EntitiesConfigurator.addNode(Toponym)
    config.addConfigurator('archivist-entities', EntitiesConfigurator)

    // Subjects subconfigurator
    config.addConfigurator('archivist-subjects', new ScholarSubConfigurator().import(SubjectsPackage))

    config.setAppConfig({
      protocol: appConfig.protocol,
      host: appConfig.host,
      port: appConfig.port,
      defaultLanguage: appConfig.defaultLanguage,
      mediaServer: appConfig.mediaServer
    })

    // Define Document Client
    config.setDocumentServerUrl(appConfig.protocol + '://'+appConfig.host+':'+appConfig.port+'/api/documents/')
    config.setDocumentClient(DocumentClient)
    // Define Resource Client
    config.setResourceServerUrl(appConfig.protocol + '://'+appConfig.host+':'+appConfig.port+'/api/entities/')
    config.setResourceClient(ResourceClient)
  }
}