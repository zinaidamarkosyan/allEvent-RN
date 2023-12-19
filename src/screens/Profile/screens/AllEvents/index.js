import React from 'react'
import { Text } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import ScreenWrapperWithNavigation from '@/components/wrappers/screen'
import InfinityList from '@/components/listItems/infinityList'
import SubEvent from '@/screens/Home/shared/subEvent'
import { useAuth, useEvents } from '@/hooks'

import { EVENT_TYPE } from '../../shared/constants'
import styles from '../../shared/sharedStyles'

const AllEventsScreen = ({ route }) => {
  const {
    me: { event_in_place },
  } = useAuth()
  const type = route?.params?.type
  const isFocused = useIsFocused()
  const [isLoading, setLoading] = React.useState(false)
  const { events, getFavorites, getLikedEvents, getEvents } = useEvents()

  React.useEffect(() => {
    if (isFocused) {
      setLoading(true)
      const request =
        type === EVENT_TYPE.BOOKMARK
          ? getFavorites
          : type === EVENT_TYPE.LIKED
          ? getLikedEvents
          : getEvents
      request().then(
        () => {
          setLoading(false)
        },
        () => {
          setLoading(false)
        },
      )
    }
  }, [getFavorites, getEvents, getLikedEvents, isFocused, type])

  const _events = React.useMemo(() => {
    return !isLoading ? (type === EVENT_TYPE.HISTORY ? [...(event_in_place || [])] : events) : []
  }, [events, event_in_place, type, isLoading])

  return (
    <ScreenWrapperWithNavigation hasBack loading={isLoading}>
      <InfinityList
        data={_events}
        Component={(props) => <SubEvent {...props} type={type} refScreen={'Профиль'} />}
        wrapperStyle={type === EVENT_TYPE.HISTORY || type === EVENT_TYPE.IS_MY ? styles.pt24 : {}}
        ListHeaderComponent={() => {
          if (type !== EVENT_TYPE.HISTORY && type !== EVENT_TYPE.IS_MY) return null
          return (
            <Text style={styles.pageTitle}>
              {EVENT_TYPE.IS_MY === type ? 'Организованные события' : 'История событий'}
            </Text>
          )
        }}
      />
    </ScreenWrapperWithNavigation>
  )
}

export default AllEventsScreen
