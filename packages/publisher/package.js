import PublisherLayout from './PublisherLayout'
import { BracketsPackage, TabbedContextPackage } from 'archivist'
import { ContainerAnnotationPackage, FindAndReplacePackage } from 'substance'

export default {
  name: 'archivist-publisher',
  configure: function(config) {
    config.import(BracketsPackage)
    config.import(TabbedContextPackage)
    config.addComponent('editor', PublisherLayout)

    config.import(ContainerAnnotationPackage)
    config.import(FindAndReplacePackage, {
      targetSurfaces: ['body']
    })

    // Configure overlay
    config.addToolPanel('main-overlay', [
      {
        name: 'prompt',
        type: 'tool-group',
        commandGroups: ['prompt']
      }
    ])

    config.addToolPanel('workflow', [
      {
        name: 'workflow',
        type: 'tool-group',
        commandGroups: ['workflows']
      }
    ])

    // Configure toolbar
    config.addToolPanel('toolbar', [
      {
        name: 'text-types',
        type: 'tool-dropdown',
        showDisabled: true,
        style: 'descriptive',
        commandGroups: ['text-types']
      },
      {
        name: 'annotations',
        type: 'tool-group',
        showDisabled: true,
        style: 'minimal',
        commandGroups: ['annotations']
      },
      {
        name: 'references',
        type: 'tool-group',
        showDisabled: true,
        style: 'minimal',
        commandGroups: ['references']
      },
      {
        name: 'utils',
        type: 'tool-group',
        showDisabled: true,
        style: 'minimal',
        commandGroups: ['utils']
      },
      {
        name: 'insert',
        type: 'tool-dropdown',
        showDisabled: true,
        style: 'descriptive',
        commandGroups: ['insert']
      }
    ])
  }
}