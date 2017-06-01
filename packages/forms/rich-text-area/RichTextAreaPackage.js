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
      ArticleClass: Document,
      defaultTextType: 'paragraph'
    })

    let defaultOptions = {
      disableCollapsedCursor: true,
      toolGroup: 'overlay'
    }

    config.import(BasePackage, defaultOptions)
    config.import(ParagraphPackage, defaultOptions)

    // HTML importers/exporters
    config.addImporter('html', RichTextAreaHTMLImporter)
    config.addExporter('html', RichTextAreaHTMLExporter)
  }
}
