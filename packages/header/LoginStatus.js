import { Component } from 'substance'

class LoginStatus extends Component {

  render($$) {
    let user = this.props.user
    let name = user.name || 'Anonymous'
    let page = this.props.page
    let el = $$('div').addClass('sc-login-status')
    el.append(
      $$('span').addClass('se-username')
        .append(this._extractInitials(name))
    )

    let settingsItem = $$('span').addClass('se-action')
      .on('click', this._openUserSettings)
      .append(this.context.iconProvider.renderIcon($$, 'user-settings'))

    if(page === 'user-settings') {
      settingsItem.addClass('se-active')
    }

    el.append(
      settingsItem,
      $$('span').addClass('se-action')
        .on('click', this._logout)
        .append(this.context.iconProvider.renderIcon($$, 'logout'))
    )
    return el
  }

  _extractInitials(name) {
    if (!name) {
      return 'A';
    }
    let parts = name.split(' ')
    return parts.map(function(part) {
      return part[0].toUpperCase() // only use the first letter of a part
    })
  }

  _logout() {
    this.send('logout')
  }

  _openUserSettings() {
    this.send('navigate', {page: 'user-settings'})
    document.title = this.getLabel('user-settings')
  }

}

export default LoginStatus
