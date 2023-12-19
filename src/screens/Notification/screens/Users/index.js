import React from 'react'
import { Text } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import ScreenWrapperWithNavigation from '@/components/wrappers/screen'
import InfinityList from '@/components/listItems/infinityList'
import APICalls from '@/apis/APICalls'

import styles from '../../shared/sharedStyles'
import UserCard from '../../shared/user'

const UsersScreen = ({
  navigation,
  route: {
    params: { parent, refScreen = {}, type, event_id, data },
  },
}) => {
  const isFocused = useIsFocused()
  const [isLoading, setIsLoading] = React.useState(false)

  const getUsers = React.useCallback(() => {
    setIsLoading(true)
    const request = type ? APICalls.getAllVisitedEvents : APICalls.getVisitingEvents
    request(event_id)
      .then((res) => {
        console.log(JSON.stringify(res, null, 4))
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [type, event_id])

  React.useEffect(() => {
    if (isFocused) {
      getUsers()
    }
  }, [getUsers, isFocused])

  return (
    <ScreenWrapperWithNavigation
      hasBack
      hideBell
      loading={isLoading}
      wrapperStyle={styles.wrapper}
      goBack={refScreen ? () => parent && navigation.navigate(parent, refScreen) : undefined}
    >
      <Text style={styles.pageTitle}>
        {!type
          ? 'Список пользователей подтвердивших свое желание на участие'
          : 'Список реальных посетителей'}
      </Text>
      <InfinityList
        data={data}
        wrapperStyle={styles.pt11}
        Component={(props) => <UserCard {...props} event_id={event_id} />}
      />
    </ScreenWrapperWithNavigation>
  )
}

export default UsersScreen
