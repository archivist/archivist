import { Component } from 'substance'

class SubjectsContext extends Component {
  render($$) {
    let el = $$('div').addClass('sc-context-panel')

    el.append('SUBJECTS')

    return el
  }
}

export default SubjectsContext
