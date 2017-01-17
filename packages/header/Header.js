import { Component } from 'substance'
import { forEach } from 'lodash-es'
import LoginStatus from './LoginStatus'

class Header extends Component {

  render($$) {
    let configurator = this.context.configurator
    let authenticationClient = this.context.authenticationClient

    let el = $$('div').addClass('sc-header')
    let actionEls = []

    let MenuItems = configurator.getMenuItems()
    forEach(MenuItems, function(item) {
      actionEls.push(
        $$('button').addClass('se-action')
          .append(item.label)
          .on('click', this.send.bind(this, 'navigate', {page: item.action}))
      )
    }.bind(this))

    let content = []
    if (this.props.content) {
      content = content.concat(this.props.content)
    }

    el.append(
      $$('div').addClass('se-icon'),
      $$('div').addClass('se-actions').append(actionEls),
      $$('div').addClass('se-content').append(content),
      $$(LoginStatus, {
        user: authenticationClient.getUser()
      })
    )
    return el
  }
}

export default Header
