import {
  Document, BasePackage, ParagraphPackage
} from 'substance'

import RichTextAreaHTMLImporter from './RichTextAreaHTMLImporter'
import RichTextAreaHTMLExporter from './RichTextAreaHTMLExporter'

export default {
  name: 'rich-text-area',
  configure: function(config) {
    config.defineSchema({
      name: 'rich-text-area',
      DocumentClass: Document,
      defaultTextType: 'paragraph'
    })

    // Overlay configuration
    config.addToolPanel('main-overlay', [
      // Displays prompts such as EditLinkTool, which are exclusive
      // so that's why we put them first
      {
        name: 'prompt',
        type: 'tool-group',
        commandGroups: ['prompt']
      },
      {
        // used to resolve icons and labels
        name: 'text-types',
        type: 'tool-dropdown',
        showDisabled: false,
        contextual: true,
        style: 'minimal',
        commandGroups: ['text-types']
      },
      {
        name: 'annotations',
        type: 'tool-group',
        contextual: true,
        showDisabled: false,
        style: 'minimal',
        commandGroups: ['annotations']
      }
    ])
    config.import(BasePackage)
    config.import(ParagraphPackage)

    // HTML importers/exporters
    config.addImporter('html', RichTextAreaHTMLImporter)
    config.addExporter('html', RichTextAreaHTMLExporter)
  }
}