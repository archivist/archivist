import { Component, Button, Input } from 'substance'

class UserForm extends Component {

  render($$) {
    let el = $$('div').addClass('sc-user-form')

    let emailInput = $$('div').addClass('se-email').append(
      $$(Input, {
        type: 'email',
        placeholder: 'Введите email',
        centered: true
      }).ref('email')
    )

    if(this.state.error) {
      emailInput.append(
        $$('div').addClass('se-error').append('Please enter valid email')
      )
    }

    let accessInput = $$('label').addClass('se-checkbox').append(
      $$(Input, {
        type: 'checkbox'
      }).ref('access'),
      $$('div').addClass('se-label').append('grant access')
    )

    let superInput = $$('label').addClass('se-checkbox').append(
      $$(Input, {
        type: 'checkbox'
      }).ref('super'),
      $$('div').addClass('se-label').append('grant super access')
    )

    let actions = $$('div').addClass('se-actions').append(
      $$(Button, {label: 'Invite', style: 'outline'}).addClass('se-invite-user')
        .on('click', this._createUser),
      $$(Button, {label: 'Cancel', style: 'outline'}).addClass('se-cancel')
        .on('click', this.send.bind(this, 'closeModal'))
    )

    el.append(
      emailInput,
      accessInput,
      superInput,
      actions
    )

    return el
  }

  _createUser() {
    let newUser = {
      email: this.refs.email.val()
    }

    newUser.access = this.refs.access.el.el.checked;
    newUser.super = this.refs.super.el.el.checked;

    let emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (emailRegExp.test(newUser.email)) {
      this.send('createUser', newUser);
    } else {
      this.setState({'error': true});
    }
  }
}

export default UserForm