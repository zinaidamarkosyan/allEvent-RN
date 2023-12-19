import React from 'react'
import { View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import ScreenWrapperWithNavigation from '@/components/wrappers/screen'
import { filteredCategories, filteredEvents } from '@/helpers/misc'
import InfinityList from '@/components/listItems/infinityList'
import PrimaryButton from '@/components/buttons/primary'
import { useAuth, useEvents } from '@/hooks'
import { ORGANIZER } from '@/constants'

import styles from '../../shared/sharedStyles'
import Map from '../../shared/map'

const MapScreen = ({ route: { params }, navigation }) => {
  const {
    me: { roles },
  } = useAuth()
  const isFocused = useIsFocused()
  const { categories, allEvents } = useEvents()
  const [activeCategory, setActiveCategory] = React.useState(undefined)

  const { coords, selectedId, refScreen, disabled } = params || {}

  const _onMapPress = React.useCallback(
    ({ geometry }) => {
      if (disabled) return
      if (refScreen === 'Создать') {
        navigation.navigate(refScreen, {
          geometry,
        })
      } else if (refScreen === 'Detail') {
        navigation.navigate('Главная', {
          screen: 'Detail',
          params: {
            geometry,
          },
        })
      }
    },
    [navigation, refScreen, disabled],
  )

  React.useEffect(() => {
    if (isFocused) {
      setActiveCategory(undefined)
    }
  }, [isFocused])

  const { name: role } = roles || {}

  const isOrganizer = role === ORGANIZER

  const filteredCategory = React.useMemo(() => {
    if (isOrganizer) return filteredCategories(categories, allEvents)
    return filteredCategories(
      categories,
      allEvents.filter((event) => event?.situation !== 'passed'),
    )
  }, [categories, allEvents, isOrganizer])

  return (
    <ScreenWrapperWithNavigation hasBack>
      <View style={{ flex: 1 }}>
        <InfinityList
          horizontal
          data={[
            ...filteredCategory,
            ...(filteredCategory.length ? [{ name: 'Все', _id: undefined }] : []),
          ]}
          wrapperStyle={styles.ph}
          Component={(props) => (
            <PrimaryButton
              {...props}
              withOutOldStyles
              label={props.item?.name}
              labelStyle={styles.label}
              wrapperStyle={styles.filterButton}
              onPress={() => setActiveCategory(props.item?._id)}
            />
          )}
        />
        <Map
          coords={coords}
          onPress={_onMapPress}
          selectedId={selectedId}
          data={filteredEvents(allEvents, activeCategory)}
        />
      </View>
    </ScreenWrapperWithNavigation>
  )
}

export default MapScreen
