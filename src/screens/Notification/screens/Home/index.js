import React from 'react'
// import { Text, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import PushNotification from 'react-native-push-notification'

import ScreenWrapperWithNavigation from '@/components/wrappers/screen'
import InfinityList from '@/components/listItems/infinityList'
import APICalls from '@/apis/APICalls'
import { useAuth } from '@/hooks'

import styles from '../../shared/sharedStyles'
import Notify from '../../shared/notify'

const NotificationsScreen = () => {
  const { getMe } = useAuth()
  const isFocused = useIsFocused()
  const [loading, setLoading] = React.useState(false)
  const [notifications, setNotifications] = React.useState([])

  React.useEffect(() => {
    if (isFocused) {
      setLoading(true)
      PushNotification.getApplicationIconBadgeNumber((number) => {
        if (number > 0) PushNotification.setApplicationIconBadgeNumber(0)
      })
      APICalls.getAllNotifications().then((res) => {
        setLoading(false)
        if (res.success) {
          getMe()
          setNotifications(res.data?.data || [])
        }
      })
    }
  }, [isFocused, getMe])

  const deleteAll = React.useCallback(() => {
    APICalls.deleteNotifications().then((res) => {
      if (res.success) {
        setNotifications([])
      }
    })
  }, [])

  return (
    <ScreenWrapperWithNavigation hasBack loading={loading} hideBell>
      {/* <View style={styles.action}>
        {!!notifications.length && (
          <Text style={styles.pageAction} onPress={deleteAll}>
            Очистить все
          </Text>
        )}
      </View> */}
      <InfinityList Component={Notify} data={notifications} wrapperStyle={styles.padding} />
    </ScreenWrapperWithNavigation>
  )
}

export default NotificationsScreen
