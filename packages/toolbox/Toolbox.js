import { Button, Component } from 'substance'
import forEach from 'lodash/forEach'

class Toolbox extends Component {

  render($$) {
    let el = $$('div').addClass('sc-toolbox')
    let actionEls = []

    if (this.props.actions) {
      forEach(this.props.actions, function(label, actionName) {
        actionEls.push(
          $$(Button).addClass('se-action')
            .append(label)
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
