import { SplitPane } from 'substance'
import Loader from '../common/Loader'
import Publisher from './Publisher'

class PublisherLayout extends Loader {

  dispose() {
    super.dispose.call(this)
    document.body.classList.remove('sm-fixed-layout')
  }

  _updateLayout() {
    if (this.props.mobile) {
      document.body.classList.remove('sm-fixed-layout')
    } else {
      document.body.classList.add('sm-fixed-layout')
    }
  }

  render($$) {
    let Notification = this.getComponent('notification')
    let Collaborators = this.getComponent('collaborators')
    let Header = this.getComponent('header')

    let notification = this.state.notification
    let el = $$('div').addClass('sc-edit-document')
    let main = $$('div')
    let header

    this._updateLayout()

    // Configure header
    // --------------

    header = $$(Header, {
      mobile: this.props.mobile
    })

    // Notification overrules collaborators
    // if (notification) {
    //   header.outlet('content').append(
    //     $$(Notification, notification)
    //   )
    // } else if (this.state.session) {
    //   header.outlet('content').append(
    //     $$(Collaborators, {
    //       session: this.state.session
    //     })
    //   )
    // }

    // Main content
    // --------------

    // Display top-level errors. E.g. when a doc could not be loaded
    // we will display the notification on top level
    if (this.state.error) {
      main = $$('div').append(
        $$(Notification, {
          type: 'error',
          message: this.state.error.message
        })
      )
    } else if (this.state.session) {
      let fileClient = this.context.fileClient
      main = $$(Publisher, {
        configurator: this.props.configurator,
        documentSession: this.state.session,
        onUploadFile: fileClient.uploadFile.bind(fileClient)
      }).ref('publisher')
    }

    el.append(
      $$(SplitPane, {splitType: 'horizontal'}).append(
        header,
        main
      ).ref('splitPane')
    )

    return el
  }

  _onCollabClientDisconnected() {
    this.extendState({
      notification: {
        type: 'error',
        message: 'Connection lost! After reconnecting, your changes will be saved.'
      }
    })
  }

  _onCollabClientConnected() {
    this.extendState({
      notification: null
    })
  }

  /*
    Extract error message for error object. Also consider first cause.
  */
  _onCollabSessionError(err) {
    var message = [
      this.getLabel(err.name)
    ]
    if (err.cause) {
      message.push(this.getLabel(err.cause.name));
    }
    this.extendState({
      notification: {
        type: 'error',
        message: message.join(' ')
      }
    })
  }

  _onCollabSessionSync() {
    if (this.state.notification) {
      // Unset notification (error message)
      this.extendState({
        notification: null
      })
    }
  }
}

export default PublisherLayout