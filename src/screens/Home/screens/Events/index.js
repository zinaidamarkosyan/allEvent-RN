import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'

import ScreenWrapperWithNavigation from '@/components/wrappers/screen'
import { EVENT_TYPE } from '@/screens/Profile/shared/constants'
import InfinityList from '@/components/listItems/infinityList'
import PrimaryButton from '@/components/buttons/primary'
import { BUTTON_OPACITY, ORGANIZER } from '@/constants'
import { filteredEvents } from '@/helpers/misc'
import { useAuth, useEvents } from '@/hooks'
import Row from '@/components/masks/Row'

import calendarIcon from '@/assets/icons/ic_calendar_outline.png'
import filterIcon from '@/assets/icons/ic_filter.png'

import DatePicker from '../../shared/datePicker'
import styles from '../../shared/sharedStyles'
import SubEvent from '../../shared/subEvent'
import Category from '../../shared/category'

const EventScreen = ({ route }) => {
  const {
    me: { roles },
    isAuthenticated,
  } = useAuth()
  const isFocused = useIsFocused()
  const [dateFilter, setDateFilter] = React.useState({})
  const [isActive, setActive] = React.useState('passing')
  const [showPicker, setShowPicker] = React.useState(false)
  const [showFilters, setShowFilters] = React.useState(true)
  const { events, categories, filterEvents, isLoading } = useEvents()
  const [activeCategory, setActiveCategory] = React.useState(route.params?.id)

  const { name: role } = roles || {}

  React.useEffect(() => {
    if (isFocused) {
      filterEvents(activeCategory, isActive)
      setDateFilter({})
    }
  }, [activeCategory, isActive, filterEvents, isFocused])

  const _filteredCategories = React.useMemo(() => {
    if (!isAuthenticated) return categories
    return categories.filter((_category) => _category.checked)
  }, [isAuthenticated, categories])

  const ListHeaderComponent = React.useMemo(() => {
    return (
      <View style={styles.maxHeight}>
        <View style={[styles.filterRow, !showFilters && styles.mb9]}>
          <TouchableOpacity
            style={styles.filter}
            activeOpacity={BUTTON_OPACITY}
            onPress={() => setShowFilters((prev) => !prev)}
          >
            <Text style={styles.filterLabel}>Фильтр</Text>
            <FastImage source={filterIcon} style={styles.filterIcon} />
          </TouchableOpacity>
        </View>
        {showFilters && (
          <>
            <Text style={[styles.filterTitle, styles.ml21, styles.mv8]}>Статус</Text>
            <Row justifyContent={'space-between'} wrapperStyle={[styles.ph17, styles.pb20]}>
              <PrimaryButton
                withOutOldStyles
                label={'Сегодня'}
                labelStyle={styles.label}
                onPress={() => setActive('passing')}
                wrapperStyle={[styles.status, isActive === 'passing' && styles.active]}
              />
              <PrimaryButton
                withOutOldStyles
                label={'Предстоящие'}
                labelStyle={styles.label}
                onPress={() => setActive('upcoming')}
                wrapperStyle={[styles.status, isActive === 'upcoming' && styles.active]}
              />
              <PrimaryButton
                withOutOldStyles
                label={'Пройденные'}
                labelStyle={styles.label}
                onPress={() => setActive('passed')}
                wrapperStyle={[styles.status, isActive === 'passed' && styles.active]}
              />
              <TouchableOpacity activeOpacity={BUTTON_OPACITY} onPress={() => setShowPicker(true)}>
                <FastImage source={calendarIcon} style={styles.icon} />
              </TouchableOpacity>
            </Row>
            <Text style={[styles.filterTitle, styles.ml21]}>Категории</Text>
            <InfinityList
              horizontal={true}
              wrapperStyle={styles.category}
              data={_filteredCategories}
              Component={(props) => (
                <Category {...props} id={activeCategory} onPress={setActiveCategory} />
              )}
            />
          </>
        )}
      </View>
    )
  }, [activeCategory, _filteredCategories, setActiveCategory, showFilters, isActive])

  return (
    <ScreenWrapperWithNavigation hasBack loading={isLoading}>
      {ListHeaderComponent}
      <InfinityList
        ListEmptyComponent={() => (
          <View style={styles.center}>
            <Text style={styles.emptyTitle}>
              {'В настоящее время в данной\nкатегории событий нет.'}
            </Text>
          </View>
        )}
        Component={(props) => (
          <SubEvent {...props} active type={role === ORGANIZER ? EVENT_TYPE.HISTORY : 0} />
        )}
        data={isLoading ? [] : filteredEvents(events, activeCategory, dateFilter)}
      />
      {showPicker && <DatePicker onChange={setDateFilter} close={() => setShowPicker(false)} />}
    </ScreenWrapperWithNavigation>
  )
}

export default EventScreen
