import { Component, FontAwesomeIcon } from 'substance'
import { forEach } from 'lodash-es'
import LoginStatus from './LoginStatus'

class Header extends Component {

  render($$) {
    let configurator = this.context.configurator
    let authenticationClient = this.context.authenticationClient
    let page = this.props.page

    let el = $$('div').addClass('sc-header')
    let actionEls = []

    let MenuItems = configurator.getMenuItems()
    forEach(MenuItems, (item) => {
      let menuItem = $$('a').addClass('se-action')
        .attr({title: this.getLabel(item.label)})
        .on('click', this.send.bind(this, 'navigate', {page: item.action}))
        .append($$(FontAwesomeIcon, {icon: item.icon}))

      if(item.action === page) {
        menuItem.addClass('se-active')
      }

      actionEls.push(
        menuItem
      )
    })

    let content = []
    if (this.props.content) {
      content = content.concat(this.props.content)
    }

    el.append(
      $$('div').addClass('se-icon'),
      $$('div').addClass('se-actions').append(actionEls),
      $$('div').addClass('se-content').append(content),
      $$(LoginStatus, {
        user: authenticationClient.getUser(),
        page: page
      })
    )
    return el
  }
}

export default Header
