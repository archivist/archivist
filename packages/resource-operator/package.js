import ResourceOperator from './ResourceOperator'

export default {
  name: 'archivist-resource-operator',
  configure: function(config) {
    config.addComponent('resource-operator', ResourceOperator)

    config.addLabel('delete-confirmation-msg', {
      en: 'You are about to delete this entity, all annotations related to this entity will be also removed, this operation can\'t be undone. Are you shure?',
      ru: 'Вы собираетесь удалить сущность, все аннотации внутри документов связанные с этой сущностью будут так же удалены. Вы уверены?'
    })
    config.addLabel('delete-wait-msg', {
      en: 'Please wait until all operations will be done...',
      ru: 'Пожалуйста дождитесь выполнения всех операций...'
    })
    config.addLabel('delete-finish-msg', {
      en: 'Entity has been deleted',
      ru: 'Сущность была удалена'
    })
    config.addLabel('delete-confirmation-submit', {
      en: 'Delete',
      ru: 'Удалить'
    })
    config.addLabel('delete-confirmation-cancel', {
      en: 'Cancel',
      ru: 'Отмена'
    })
    config.addLabel('merge-confirmation-msg', {
      en: 'You are about to merge two entities, all annotations related to first entity will be replased with second one, first entity will be removed. This operation can\'t be undone. Are you shure?',
      ru: 'Вы собираетесь слить две сущности, все аннотации внутри документов связанные с первой сущностью будут заменены на аннотации связанные со второй, первая сущность будет удалена. Вы уверены?'
    })
    config.addLabel('merge-finish-msg', {
      en: 'Entity has been merged',
      ru: 'Сущности были слиты'
    })
    config.addLabel('merge-confirmation-submit', {
      en: 'Merge',
      ru: 'Слить'
    })
    config.addLabel('resop-error-msg', {
      en: 'Sorry, something went wrong...',
      ru: 'Ой, что-то пошло не так...'
    })
    config.addLabel('search-merge-placeholder', {
      en: 'Type to search...',
      ru: 'Искать сущность...'
    })
    config.addLabel('merge-divider', {
      en: 'Merge to...',
      ru: 'Слить с...'
    })
  }
}