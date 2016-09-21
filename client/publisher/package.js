import { ProseEditorPackage } from 'substance'
import ArchivistPackage from '../../packages/archivist/package'
import DocumentsPackage from '../../packages/documents/package'
import PublisherPackage from '../../packages/publisher/package'
import AuthenticationClient from './AuthenticationClient'
import DocumentClient from './DocumentClient'
import FileClient from './FileClient'

let appConfig = '{"protocol":"http","host":"localhost","port":5000}'
appConfig = JSON.parse(appConfig)

export default {
  name: 'archivist-publisher',
  configure: function(config) {
    // Use the default Archivist package
    config.import(ArchivistPackage)
    config.import(DocumentsPackage)

    // Add subconfigurators
    let Configurator = ProseEditorPackage.Configurator
    config.addConfigurator('archivist-interview-editor', new Configurator().import(PublisherPackage))

    // Add app's root style
    //config.addStyle(__dirname, 'app.scss');

    config.setAppConfig({
      protocol: appConfig.protocol,
      host: appConfig.host,
      port: appConfig.port
    });

    // Define Authentication Client
    config.setAuthenticationServerUrl(appConfig.protocol + '://'+appConfig.host+':'+appConfig.port+'/api/auth/')
    config.setAuthenticationClient(AuthenticationClient)
    // Define Document Client
    config.setDocumentServerUrl(appConfig.protocol + '://'+appConfig.host+':'+appConfig.port+'/api/documents/')
    config.setDocumentClient(DocumentClient)
    // Define File Client
    config.setFileServerUrl(appConfig.protocol + '://'+appConfig.host+':'+appConfig.port+'/api/files/')
    config.setFileClient(FileClient)

    config.setMenuItems([
      {label: 'Documents', action: 'documents'}
    ])
  }
}