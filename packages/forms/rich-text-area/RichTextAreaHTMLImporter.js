import { HTMLImporter, isArray } from 'substance'

/*
  Usage:

  ```js
  let importer = cfg.createImporter('html')
  let doc = importer.importDocument('<p>foo</p><p>bar</p>')
  ```
*/
class RichTextAreaHTMLImporter extends HTMLImporter {
  convertDocument(bodyEls) {
    if (!isArray(bodyEls)) {
      bodyEls = [ bodyEls ]
    }
    this.convertContainer(bodyEls, 'body')
  }
}

export default RichTextAreaHTMLImporter
