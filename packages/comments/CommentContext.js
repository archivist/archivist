import { Component } from 'substance'
import { forEach } from 'lodash-es'
import Forms from '../forms/Forms'
import moment from 'moment'

class CommentContext extends Component {

  constructor(...args) {
    super(...args)

    this.forms = new Forms({configurator: this.context.configurator})

    this.handleActions({
    })
  }

  didMount() {
    super.didMount()
    this._initEditor()
  }

  dispose() {
    super.dispose()
    this.getForms().off(this)
    this.getForms().dispose()
  }

  didUpdate() {
    this.getForms().off(this)
    this.getForms().dispose()
    this._initEditor()
  }

  render($$) {
    let mode = this.props.mode
    if(mode === 'list') {
      return this.renderCommentList($$)
    } else if (mode === 'edit') {
      return this.renderCommentEditor($$)
    } else {
      return this.renderComment($$)
    }
  }

  renderCommentList($$) {
    let ScrollPane = this.getComponent('scroll-pane')

    let entityEntries = $$("div")
      .addClass("se-comment-entries")
      .ref('commentEntries')

    let doc = this.context.doc
    let typeIndex = doc.getIndex('type')
    let entries = typeIndex.get('comment')

    forEach(entries, (entry, id) => {
      let item = $$('div').addClass('se-comment-entry').append(
        $$('div').addClass('se-comment-meta').append(
          $$('span').addClass('se-author').append(
            this._getAuthorName(entry.author)
          ),
          $$('span').addClass('se-created-date').append(moment(entry.createdAt, moment.ISO_8601).format('DD.MM.YYYY HH:mm'))
        ),
        $$('div').addClass('se-source').append(
          $$('span').addClass('se-highlighted').append(entry.getText())
        ),
        $$('div').addClass('se-comment-body').setInnerHTML(entry.content)
      ).on('click', this._viewComment.bind(this, id))
      entityEntries.append(item)
    })

    let el = $$('div').addClass('sc-comment-panel')

    el.append(
      $$(ScrollPane).ref('panelEl').append(
        entityEntries
      )
    )

    return el
  }

  renderCommentEditor($$) {
    let ScrollPane = this.getComponent('scroll-pane')

    let doc = this.context.doc
    let item = this.props.item
    let entry = doc.get(item)

    let el = $$('div').addClass('sc-comment-panel')

    let header = $$('div').addClass('sc-panel-header').append(
      $$('div').addClass('sc-goback-action').append(
        this.context.iconProvider.renderIcon($$, 'goBackToList'),
        this.getLabel('goBackToComments')
      ).on('click', this._showList),
      $$('div').addClass('sc-actions').append(
        $$('div').addClass('sc-edit-action').append(
          this.context.iconProvider.renderIcon($$, 'saveChanges'),
          this.getLabel('saveComment')
        ).on('click', this._onCommentUpdate.bind(this, item)),
        $$('div').addClass('sc-remove-action').append(
          this.context.iconProvider.renderIcon($$, 'removeReference'),
          this.getLabel('removeReference')
        ).on('click', this._removeComment.bind(this, item))
      )
    )

    let content = entry.content || '<p></p>'

    el.append(
      header,
      $$(ScrollPane).addClass('se-edit-comment').ref('panelEl').append(
        $$('div').addClass('se-comment-item').append(
          $$('div').addClass('se-comment-meta').append(
            $$('span').addClass('se-author').append(this._getAuthorName(entry.author)),
            $$('span').addClass('se-created-date').append(moment(entry.createdAt).format('DD.MM.YYYY HH:mm'))
          ),
          $$('div').addClass('se-comment-editor')
            .ref('commentEl')
            .setInnerHTML(content)
        )
      )
    )

    return el
  }

  renderComment($$) {
    let doc = this.context.doc
    let item = this.props.item
    let entry = doc.get(item)

    let el = $$('div').addClass('sc-comment-panel')

    let header = $$('div').addClass('sc-panel-header').append(
      $$('div').addClass('sc-goback-action').append(
        this.context.iconProvider.renderIcon($$, 'goBackToList'),
        this.getLabel('goBackToComments')
      ).on('click', this._showList),
      $$('div').addClass('sc-actions').append(
        $$('div').addClass('sc-edit-action').append(
          this.context.iconProvider.renderIcon($$, 'editReference'),
          this.getLabel('editReference')
        ).on('click', this._editComment.bind(this, item)),
        $$('div').addClass('sc-remove-action').append(
          this.context.iconProvider.renderIcon($$, 'removeReference'),
          this.getLabel('removeReference')
        ).on('click', this._removeComment.bind(this, item))
      )
    )

    el.append(
      header,
      $$('div').addClass('se-comment-item').append(
        $$('div').addClass('se-comment-meta').append(
          $$('span').addClass('se-author').append(this._getAuthorName(entry.author)),
          $$('span').addClass('se-created-date').append(moment(entry.createdAt).format('DD.MM.YYYY HH:mm'))
        ),
        $$('div').addClass('se-comment').setInnerHTML(entry.content)
      )
    )

    return el
  }

  getForms() {
    return this.forms
  }

  _initEditor() {
    // TODO: find a way to use comment editor within other container
    // to avoid problems with selection jumping and exiting editor after remote update
    let mode = this.props.mode
    if(mode === 'edit') {
      this.getForms().addRichTextArea('comment', this.refs.commentEl.getNativeElement(), {
        enabledPackages: ['heading', 'strong', 'emphasis', 'link', 'list'],
        placeholder: this.getLabel('defaultComment')
      })
    }
  }

  _editComment(id) {
    this.extendProps({mode: 'edit', item: id})
  }

  _viewComment(id) {
    this.send('showComment', id)
    this.extendProps({mode: 'view', item: id})
  }

  _showList() {
    this.extendProps({
      mode: 'list',
      item: undefined
    })
  }

  _removeComment() {
    let item = this.props.item
    let editorSession = this.context.editorSession
    editorSession.transaction(function(tx, args) {
      tx.delete(item)
      return args
    })
    this.extendProps({
      mode: 'list',
      item: undefined
    })
  }

  _onCommentUpdate() {
    let content = this.getForms().getHTML('comment')
    let editorSession = this.context.editorSession
    editorSession.transaction((tx, args) => {
      tx.set([this.props.item, 'content'], content)
      return args
    })
    this.extendProps({
      mode: 'list',
      item: undefined
    })
  }

  _getAuthorName(userId) {
    let editorSession = this.context.editorSession
    let collaborators = editorSession.collaborators
    let user = collaborators[userId]
    if(user) return user.name
    return 'Anonymous'
  }

}

export default CommentContext
