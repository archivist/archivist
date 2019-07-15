//import Forms from './Forms'
import NodeForm from './NodeForm'

export default {
  name: 'forms',
  configure: function(config) {
    config.addComponent('form', NodeForm)
    config.addLabel('tags-add-values', {
      en: 'Add values',
      ru: 'Добавить'
    })
    config.addLabel('toggle-unknown', {
      en: 'Unknown',
      ru: 'Неизвестно'
    })
    config.addLabel('select-unknown', {
      en: 'Not selected',
      ru: 'Не выбрано'
    })
    config.addLabel('toggle-yes', {
      en: 'Yes',
      ru: 'Да'
    })
    config.addLabel('toggle-no', {
      en: 'No',
      ru: 'Нет'
    })
  }
}
