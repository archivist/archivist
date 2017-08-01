import { HTMLImporter } from 'substance'

/*
  Usage:
  ```js
  let importer = cfg.createImporter('html')
  let doc = importer.importDocument('<p>foo</p><p>bar</p>')
  ```
*/
class RichTextAreaHTMLImporter extends HTMLImporter {
  convertDocument(documentEl) {
    let bodyEl = documentEl.find('body')
    this.convertContainer(bodyEl.childNodes, 'body')
  }
}

export default RichTextAreaHTMLImporter