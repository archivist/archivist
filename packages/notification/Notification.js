import { Component } from 'substance'

class Notification extends Component {

  render($$) {
    let el = $$('div').addClass('sc-notification se-type-' + this.props.type)
    el.append(
      $$('div').addClass('se-message').append(this.props.message),
      $$('div').addClass('se-icon').append(
        this.context.iconProvider.renderIcon($$, this.props.type + '-msg')
      )
    )

    return el
  }
}

export default Notification
