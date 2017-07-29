import { Component } from 'substance'

class Spinner extends Component {

  render($$) {
    let el = $$('div')
      .addClass('sc-spinner')
      .append(
        $$('div').addClass('se-spinner')
      )

    if(this.props.message) {
      el.append(
        $$('div')
          .addClass('se-message')
          .append(this.getLabel(this.props.message))
      )
    }

    return el
  }

}

export default Spinner
