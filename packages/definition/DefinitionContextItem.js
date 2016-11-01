import { Component } from 'substance'

class DefinitionContextItem extends Component {

  render($$) {
    let el = $$('div')
      .addClass('sc-entity-entry se-definition')
      .on('click', this.handleClick)
      .append(
        $$('div').addClass('se-title').append(this.props.data.title),
        $$('div').addClass('se-description').append(this.props.data.description)
      )

    return el
  }

  handleClick() {

  }

}

export default DefinitionContextItem