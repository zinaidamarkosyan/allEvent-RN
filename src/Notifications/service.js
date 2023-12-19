import { useCallback, useEffect } from 'react'
import { AppState, Linking } from 'react-native'
import PushNotification, { Importance } from 'react-native-push-notification'
import messaging from '@react-native-firebase/messaging'

import { IS_IOS } from '@/constants'
import { useAuth } from '@/hooks'

import NotificationHandler from './handler'

const NotificationService = ({ children }) => {
  const { setFCMToken } = useAuth()
  // fetch notifications when app state changes
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        PushNotification.getChannels((channels) => {
          console.log({ PushNotificationChannels: channels })
        })
      }
    }

    const listener = AppState.addEventListener('change', handleAppStateChange)

    return () => listener.remove()
  }, [])

  useEffect(() => {
    if (IS_IOS) return

    PushNotification.createChannel(
      {
        vibrate: true,
        importance: Importance.HIGH,
        channelName: `AllevenFCMDefaultChannel`,
        channelDescription: 'A default channel of FCM',
        channelId: 'fcm_fallback_notification_channel',
      },
      (created) =>
        console.log(`Creating default channel: ${created ? 'Success' : 'Already exists'}`),
    )
  }, [])

  const registerFCMToken = useCallback(() => {
    const getToken = async () => {
      try {
        const token = await messaging().getToken()
        setFCMToken(token)
        console.log({ FCMToken: token })
      } catch (error) {
        console.log({ FCMTokenError: error })
      }
    }
    getToken()
  }, [setFCMToken])

  useEffect(() => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission()
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      if (enabled) {
        console.log('FCM Authorization status:', authStatus)
        registerFCMToken()
      }
    }

    requestUserPermission()
  }, [registerFCMToken])

  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage)
        }
      })
  }, [])

  useEffect(() => {
    const onNotification = (notification) => {
      console.log({ notification })
      const { data, userInteraction } = notification
      const { link } = data || {}
      if (userInteraction && link) {
        Linking.openURL(link)
      }
    }
    NotificationHandler.attachNotification(onNotification)
  }, [])

  return children
}

export default NotificationService
