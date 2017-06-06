import { ClientConnection } from 'substance'
import WebSocket from 'ws'

/**
  Server WebSocket abstraction. Handles reconnects etc.
*/
class ServerWebSocketConnection extends ClientConnection {
  _createWebSocket() {
    return new WebSocket(this.config.wsUrl)
  }
}

export default ServerWebSocketConnection