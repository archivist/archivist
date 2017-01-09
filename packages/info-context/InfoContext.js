import { Component } from 'substance'

class InfoContext extends Component {
  render($$) {
    let el = $$('div').addClass('sc-context-panel')

    el.append('INFO')

    return el
  }
}

export default InfoContext
