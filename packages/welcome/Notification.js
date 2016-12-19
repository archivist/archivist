import { Component } from 'substance'

class Notification extends Component {

  render($$) {
    let el = $$('div').addClass('sc-notification se-type-' + this.props.type)
    el.append(this.props.message)
    return el
  }
}

export default Notification
