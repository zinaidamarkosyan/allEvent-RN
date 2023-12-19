import React from 'react'
import { Text } from 'react-native'

import styles from '@/screens/Home/shared/sharedStyles'

const Statistics = ({
  viewsCount = 0,
  visitsCount = 0,
  likesCount = 0,
  favoritesCount = 0,
  inPlaceCount = 0,
}) => {
  return (
    <>
      <Text style={[styles.detailHeader, styles.mt32]}>Статистика</Text>
      <Text style={[styles.detailDescription, styles.eventDescription]}>
        Открыли событие: {viewsCount}
      </Text>
      <Text style={[styles.detailDescription, styles.eventDescription]}>
        Кликнули кнопку “Я пойду”: {visitsCount}
      </Text>
      <Text style={[styles.detailDescription, styles.eventDescription]}>Лайк: {likesCount}</Text>
      <Text style={[styles.detailDescription, styles.eventDescription]}>
        Сохранили в избранных: {favoritesCount}
      </Text>
      <Text style={[styles.detailDescription, styles.eventDescription]}>
        Кликнули кнопку “Я на месте”: {inPlaceCount}
      </Text>
    </>
  )
}

export default Statistics
