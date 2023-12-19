import PushNotification from 'react-native-push-notification'

class NotificationHandler {
  onNotification(notification) {
    console.log('NotificationHandler:', notification)

    if (typeof this._onNotification === 'function') {
      this._onNotification(notification)
    }
  }

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError(err) {
    console.log({ onRegistrationError: err })
  }

  attachNotification(handler) {
    this._onNotification = handler
  }
}

const handler = new NotificationHandler()

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: handler.onNotification.bind(handler),

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: handler.onRegistrationError.bind(handler),

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: true,
})

export default handler
