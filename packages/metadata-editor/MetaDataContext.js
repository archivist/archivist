import { Component, ScrollPane } from 'substance'
import MetadataEditor from './MetadataEditor'

class MetaDataContext extends Component {

  render($$) {
    let doc = this.context.doc
    let el = $$('div').addClass('sc-metadata-context')

    el.append(
      $$(ScrollPane).append(
        $$(MetadataEditor, {node: doc.get('meta')})
      ).ref('panelEl')
    )

    return el
  }
}

export default MetaDataContext
