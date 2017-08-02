import { Component } from 'substance'
import { forEach } from 'lodash-es'

class Toolbox extends Component {

  render($$) {
    const Button = this.getComponent('button')

    let el = $$('div').addClass('sc-toolbox')
    let actionEls = []

    if (this.props.actions) {
      forEach(this.props.actions, function(label, actionName) {
        actionEls.push(
          $$(Button, {style: 'outline', label: label}).addClass('se-action')
            .on('click', this.send.bind(this, actionName))
        )
      }.bind(this))
    }

    let content = []
    if (this.props.content) {
      content = content.concat(this.props.content)
    }

    el.append(
      $$('div').addClass('se-actions').append(actionEls),
      $$('div').addClass('se-content').append(content)
    )

    return el
  }
}

export default Toolbox
