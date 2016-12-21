import Field from './Field'
import extend from 'lodash/extend'
import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'
import find from'lodash/find'
import each from 'lodash/each'
import map from 'lodash/map'

class Reference extends Field {

  didMount() {
    this._loadOptions()
  }

  getInitialState() {
    let state = {
      selected: this.props.value,
      dropdown: false,
      options: []
    }

    return state
  }

  getFieldValue() {
    let config = this.getConfig();
    let value = map(this.state.selected, 'id')

    if(!config.multiple) {
      value = value[0] || ''
    }
    return value
  }
  
  render($$) {
    let name = this.getName()
    let config = this.getConfig()

    let el = $$('div').addClass('sc-field sc-field-multiple sc-field-' + name)

    let multipleWidget = $$('div').addClass('se-multiple')
    
    each(this.state.selected, function(value) {
      multipleWidget.append(
        $$('div').addClass('se-value').append(value.name)
          .attr('data-id', value.id)
          .on('click', this.removeValue)
      )
    }.bind(this))

    el.append(multipleWidget)
    
    if(this.state.selected.length < 1 || config.multiple) {
      el.append(
        $$('input').attr({type: 'text', placeholder: this.getLabel('reference-select')})
          .ref('value')
          .on('keyup', this.onKeyUp)
          .on('blur', this.onBlur)
      )
    }

    if(this.state.dropdown) {
      let options = this.state.options
      let selected = this.state.selected
      let ids = map(selected, 'id')
      let list = $$('ul').addClass('se-dropdown-list')
     
      if(options.length > 0) {
        each(options, function(option) {
          let item = $$('li').addClass('se-dropdown-item').append(option.name)
            .attr('data-id', option.id)

          if(ids.indexOf(option.id) > -1) {
            item.addClass('se-disabled-item')
          } else {
            item.on('click', this.addValue)
          }

          list.append(item)
        }.bind(this))
      } else {
        let item = $$('li').addClass('se-dropdown-item se-disabled-item')
          .append(this.getLabel('reference-empty-value'))
        list.append(item)
      }
      el.append(list)
    }

    if(config.placeholder) el.append($$('div').addClass('help').append(config.placeholder))
    
    return el
  }

  prepareList(value) {
    let dataClient = this.context.documentClient
    let config = this.getConfig()
    let restrictions = config.restrictions

    dataClient.findEntities(value, restrictions, function(err, res) {
      if (err) {
        console.error(err)
        return
      }

      let options = map(res, function(e) {return {id: e.entity_id, name: e.name} })
      this.extendState({options: options, dropdown: true})
    }.bind(this))
  }

  onKeyUp() {
    //let key = e.keyCode || e.which;
    let value = this.refs.value.val()
    this.prepareList(value)
  }

  onBlur() {
    this.refs.value.val('')
    setTimeout(function() {
      this.extendState({dropdown: false})
    }.bind(this), 300)
  }

  addValue(e) {
    e.preventDefault()
    e.stopPropagation()
    let config = this.getConfig()
    let id = e.target.dataset.id
    let selected = this.state.selected
    let value = find(this.state.options, function(item) { return item.id === id; })
    if(!config.multiple) {
      selected = []
    }
    selected.push(value)
    this.refs.value.val('')
    this.extendState({selected: selected, dropdown: false})
    this.commit()
  }

  removeValue(e) {
    e.preventDefault()
    let el = e.target
    let highlighted = el.classList.contains('se-hihglight-remove')
    if(highlighted) {
      this.deleteValue(el.dataset.id)
    } else {
      each(el.parentElement.childNodes,function(node){
        node.className = 'se-value'
      })
      el.className += ' se-hihglight-remove'
    }
  }

  deleteValue(id) {
    let selected = this.state.selected
    selected = filter(selected, function(item) { return item.id !== id; })
    this.extendState({selected: selected})
    this.commit()
  }

  _loadOptions() {
    let config = this.getConfig()
    let selected = this.state.selected
    let dataClient = this.context.documentClient
    let restrictions = extend({}, config.restrictions, {entity_id: selected})

    if(!isEmpty(selected)) {
      dataClient.findEntities('', restrictions, function(err, res) {
        if (err) {
          console.error(err)
          return
        }
        each(res, function(item) {
          item.id = item.entity_id
        })
        this.extendState({selected: res})
      }.bind(this))
    }
  }
}

export default Reference
