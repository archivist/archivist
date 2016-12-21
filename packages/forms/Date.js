import Field from './Field'
import map from 'lodash/map'
import range from 'lodash/range'

class Date extends Field {

  getMonthName(month) {
    return this.constructor.static.monthNames[month]
  }

  getValue() {
    let value = this.props.value;
    let date = new window.Date(value);
    let result = {};
    result.days = date.getDate();
    result.months = date.getMonth();
    result.years = date.getFullYear();
    return result;
  }

  getFieldValue() {
    let days = this.refs.days.val()
    let months = this.refs.months.val() - 1
    let years = this.refs.years.val()
    let date = new window.Date(years, months, days)
    return date.toISOString()
  }
  
  render($$) {
    let self = this

    let name = this.getName()
    let config = this.getConfig()
    let value = this.getValue()

    let today = new window.Date()
    let startYear = config.startYear || today.getFullYear() - 100
    let endYear = config.endYear || today.getFullYear()

    let days = $$('select').ref('days').on('change', this.commit)
    map(range(1, 32), function(day) {
      let option = $$('option').attr({value: day}).append(day.toString())
      if(day === value.days) option.attr({selected: "selected"})
      days.append(option)
    })

    let months = $$('select').ref('months').on('change', this.commit)
    map(range(1, 13), function(month) {
      let monthName = self.getMonthName(month - 1)
      let option = $$('option').attr({value: month}).append(monthName)
      if(value.months === month - 1) option.attr({selected: "selected"})
      months.append(option)
    }, this)

    let years = $$('select').ref('years').on('change', this.commit)
    map(range(startYear, endYear + 1), function(year) {
      let option = $$('option').attr({value: year}).append(year.toString())
      if(year === value.years) option.attr({selected: "selected"})
      years.append(option)
    }, this)

    let el = $$('div')
      .addClass('sc-field sc-field-date sc-field-' + name)

    el.append([days, months, years])
    
    if(config.placeholder) el.append($$('div').addClass('help').append(config.placeholder))

    return el
  }
}

Date.monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export default Date
