import { Component } from 'substance'

class SourceContext extends Component {
  render($$) {
    let el = $$('div').addClass('sc-context-panel')

    el.append('SOURCE')

    return el
  }
}

export default SourceContext
