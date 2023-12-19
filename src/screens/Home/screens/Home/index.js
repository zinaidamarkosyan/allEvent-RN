import React from 'react'
import { Text } from 'react-native'

import ScreenWrapperWithNavigation from '@/components/wrappers/screen'
import InfinityList from '@/components/listItems/infinityList'
import { filteredCategories } from '@/helpers/misc'
import { useAuth, useEvents } from '@/hooks'
import { ORGANIZER } from '@/constants'
import { GREEN } from '@/theme/colors'

import styles from '../../shared/sharedStyles'
import Event from '../../shared/event'

const HomeScreen = ({ navigation }) => {
  const {
    me: { roles },
    isAuthenticated,
  } = useAuth()
  const { categories, allEvents, isLoading } = useEvents()
  const { name: role } = roles || {}

  const isOrganizer = role === ORGANIZER
  const _filteredCategories = React.useMemo(() => {
    if (!isAuthenticated) return categories
    return categories.filter((_category) => _category.checked)
  }, [categories, isAuthenticated])

  const emptyComponent = React.useMemo(() => {
    if (!isOrganizer && !isLoading && !allEvents.length)
      return () => (
        <Text style={[styles.detailHeader, { textAlign: 'center' }]}>
          Ищите события рядом. Посмотрите события на карте.
        </Text>
      )
    if (isOrganizer && !isLoading && !allEvents.length)
      return () => (
        <Text style={[styles.detailHeader, { textAlign: 'center' }]}>
          {'У вас еще нет ни одного созданного события.  '}
          <Text
            style={{ color: GREEN, textDecorationLine: 'underline' }}
            onPress={() => navigation.navigate('Создать')}
          >
            {'Создайте'}
          </Text>
          {'  его сейчас'}
        </Text>
      )
    return null
  }, [isOrganizer, navigation, isLoading, allEvents])

  return (
    <ScreenWrapperWithNavigation loading={isLoading} wrapperStyle={styles.homeWrapper}>
      <InfinityList
        Component={Event}
        wrapperStyle={styles.pv15}
        ListEmptyComponent={emptyComponent}
        data={isOrganizer ? filteredCategories(categories, allEvents) : _filteredCategories}
      />
    </ScreenWrapperWithNavigation>
  )
}

export default HomeScreen
