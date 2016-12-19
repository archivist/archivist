import { Component } from 'substance'
import EnterName from './EnterName'

class UserSettings extends Component {
  
  render($$) {
    let el = $$('div').addClass('sc-index-section').append(
      $$(EnterName, this.props)
    )
    return el
  }
}

export default UserSettings
