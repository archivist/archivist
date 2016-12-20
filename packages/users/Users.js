import { Component, Button, FontAwesomeIcon as Icon, Grid, Input, Layout, Modal, SubstanceError as Err } from 'substance'
import concat from 'lodash/concat'
import findIndex from 'lodash/findIndex'
import isEqual from 'lodash/isEqual'
import moment from 'moment'
import UserForm from './UserForm'

class UsersList extends Component {
  constructor(...args) {
    super(...args)

    this.handleActions({
      'loadMore': this._loadMore,
      'toggleAccess': this._toggleAccess,
      'addUser': this._showUserDialog,
      'createUser': this._createUser,
      'closeModal': this._hideUserDialog
    })
  }

  getInitialState() {
    return {
      dialog: false,
      active: {},
      filters: {},
      perPage: 30,
      order: 'created',
      direction: 'desc',
      pagination: false,
      items: []
    }
  }

  didMount() {
    this._loadData()
  }

  didUpdate(oldProps, oldState) {
    if(!isEqual(oldState.filters, this.state.filters)) {
      this._loadData()
    }
  }

  render($$) {
    let items = this.state.items
    let el = $$('div').addClass('sc-users-page')

    let header = this.renderHeader($$)
    el.append(header)

    let toolbox = this.renderToolbox($$)
    el.append(toolbox)

    if (this.state.dialog) {
      el.append(
        $$(Modal, {
          width: 'middle'
        }).addClass('se-user-form-modal').append(
          $$(UserForm).ref('user-form')
        )
      )
    }

    if (!items) {
      return el
    }

    if (items.length > 0) {
      el.append(this.renderFull($$))
    } else {
      el.append(this.renderEmpty($$))
    }
    return el
  }

  renderFilters($$) {
    let filters = []
    let search = $$('div').addClass('se-search').append(
      $$(Icon, {icon: 'fa-search'})
    )
    let searchInput = $$(Input, {type: 'search', placeholder: 'Search by email...'})
      .ref('searchInput')

    if(this.isSearchEventSupported) {
      searchInput.on('search', this._onSearch)
    } else {
      searchInput.on('keypress', this._onSearchKeyPress)
    }
    search.append(searchInput)

    filters.push(search)

    return filters
  }

  renderHeader($$) {
    let Header = this.getComponent('header')
    return $$(Header)
  }

  renderToolbox($$) {
    let Toolbox = this.getComponent('toolbox')
    let filters = this.renderFilters($$)

    let toolbox = $$(Toolbox, {
      actions: {
        'addUser': '+ New User'
      },
      content: filters
    })

    return toolbox
  }

  renderEmpty($$) {
    let layout = $$(Layout, {
      width: 'medium',
      textAlign: 'center'
    })

    if(this.state.total === 0) {
      layout.append(
        $$('h1').html(
          'No results'
        ),
        $$('p').html('Sorry, no users matches your query')
      )
    } else {
      layout.append(
        $$('div').addClass('se-spinner').append(
          $$('div').addClass('se-rect1'),
          $$('div').addClass('se-rect2'),
          $$('div').addClass('se-rect3'),
          $$('div').addClass('se-rect4'),
          $$('div').addClass('se-rect5')
        ),
        $$('h2').html(
          'Loading...'
        )
      )
    }

    return layout
  }

  renderFull($$) {
    let items = this.state.items
    let total = this.state.total
    let Pager = this.getComponent('pager')
    let grid = $$(Grid)

    if (items) {
      items.forEach(item => {
        let accessCheckboxIcon = item.access ? 'fa-check-square-o' : 'fa-square-o'
        let accessCheckbox = $$('div').addClass('se-checkbox').append(
          $$('div').addClass('se-label').append('access'),
          $$(Icon, {icon: accessCheckboxIcon})
        ).on('click', this._toggleAccess.bind(this, item.userId, 'access'))

        let superCheckboxIcon = item.super ? 'fa-check-square-o' : 'fa-square-o'
        let superCheckbox = $$('div').addClass('se-checkbox').append(
          $$('div').addClass('se-label').append('super access'),
          $$(Icon, {icon: superCheckboxIcon})
        ).on('click', this._toggleAccess.bind(this, item.userId, 'super'))

        let resetPwd = $$(Button, {label: 'Reset password', style: 'outline'})
          .on('click', this._resetPwd.bind(this, item.userId))

        let created = moment(item.created).format("DD.MM.YYYY HH:mm")
        
        grid.append(
          $$(Grid.Row, {user: item}).append(
            $$(Grid.Cell, {columns: 2}).append(item.email),
            $$(Grid.Cell, {columns: 3}).append(item.name || 'Anonymous'),
            $$(Grid.Cell, {columns: 2}).append('created at ' + created),
            $$(Grid.Cell, {columns: 1}).append(accessCheckbox),
            $$(Grid.Cell, {columns: 2}).append(superCheckbox),
            $$(Grid.Cell, {columns: 2}).addClass('se-reset').append(resetPwd)
          ).ref(item.userId)
        )
      })
    }

    if(total > this.state.perPage) {
      grid.append(
        $$(Pager, {
          total: total,
          loaded: items.length
        })
      )
    }

    return grid
  }

  _showUserDialog() {
    this.extendState({'dialog': true})
  }

  _hideUserDialog() {
    this.extendState({'dialog': false})
  }

  _toggleAccess(userId, prop) {
    let authClient = this.context.authenticationClient
    let user = this.refs[userId].props.user
    let update = {}
    update[prop] = !user[prop]
    authClient.updateUser(userId, update, function(err) {
      if (err) {
        this.setState({
          error: new Err('UserList.UpdateError', {
            message: 'User could not be updated.',
            cause: err
          })
        })
        console.error('ERROR', err)
        return
      }

      let items = this.state.items
      let changedItem = findIndex(items, function(i) { return i.userId === userId })
      items[changedItem][prop] = !user[prop]
      this.extendState({items: items})
    }.bind(this))
  }

  _resetPwd(userId) {
    let authClient = this.context.authenticationClient
    authClient.requestNewPassword(userId, function(err) {
      if (err) {
        this.setState({
          error: new Err('UserList.UpdateError', {
            message: 'User could not be updated.',
            cause: err
          })
        })
        console.error('ERROR', err)
        return
      }
    }.bind(this))
  }

  _createUser(data) {
    let authClient = this.context.authenticationClient
    authClient.createUser(data, function(err, user) {
      if (err) {
        this.extendState({dialog: false})
        console.error('ERROR', err)
        return
      }
      let users = this.state.items
      users.unshift(user)
      this.extendState({items: users, dialog: false})
    }.bind(this))
  }

  /*
    Load more data
  */
  _loadMore() {
    this.extendState({
      pagination: true
    })
    this._loadData()
  }

  /*
    Loads users
  */
  _loadData() {
    let authClient = this.context.authenticationClient
    let filters = this.state.filters
    let perPage = this.state.perPage
    let order = this.state.order
    let direction = this.state.direction
    let pagination = this.state.pagination
    let items = []
    let options = {
      limit: perPage, 
      offset: pagination ? this.state.items.length : 0,
      order: order + ' ' + direction
    }

    authClient.listUsers(filters, options, (err, res) => {
      if (err) {
        this.setState({
          error: new Err('UsersPage.LoadingError', {
            message: 'Users could not be loaded.',
            cause: err
          })
        })
        console.error('ERROR', err)
        return
      }

      if(pagination) {
        items = concat(this.state.items, res.records)
      } else {
        items = res.records
      }

      this.extendState({
        items: items,
        total: parseInt(res.total, 10)
      })
    })
  }

  _onSearchKeyPress(e) {
    // Perform search query on pressing enter
    if (e.which === 13 || e.keyCode === 13) {
      let searchValue = this.refs['searchInput'].val()
      this.extendState({
        filters: {'email ~~*': '%' + searchValue + '%'},
        pagination: false
      })
      return false;
    }
  }

  _onSearch() {
    let searchValue = this.refs['searchInput'].val()
    this.extendState({
      filters: {'email ~~*': '%' + searchValue + '%'},
      pagination: false
    })
  }

  isSearchEventSupported() {
    let element = document.createElement('input')
    let eventName = 'onsearch'
    let isSupported = (eventName in element)
    
    return isSupported
  }
}

export default UsersList
