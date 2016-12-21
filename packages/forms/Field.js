import { Component } from 'substance'

class Field extends Component {

  getName() {
    return this.props.id
  }

  getConfig() {
    return this.props.config
  }

  getValue() {
    return this.props.value
  }

  getFieldValue() {
    return this.refs.input.val()
  }

  getSession() {
    let form = this.props.form
    return form.props.session
  }

  getNodeId() {
    return this.props.form.node.id
  }

  commit() {
    let session = this.getSession()
    let nodeId = this.getNodeId()
    let propId = this.props.id
    let value = this.getFieldValue()

    session.transaction(function(tx) {
      tx.set([nodeId, propId], value)
    })
  }
  
  render($$) {
    return $$('div')
      .addClass('sc-field')
  }
}

export default Field
