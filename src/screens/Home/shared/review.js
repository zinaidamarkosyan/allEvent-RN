import React from 'react'
import { Text } from 'react-native'
import { Rating } from 'react-native-ratings'

import Row from '@/components/masks/Row'
import { RW } from '@/theme/utils'

import styles from './sharedStyles'

const Review = ({ wrapperStyle, rating = 0, onRate }) => {
  const [disabled, setDisabled] = React.useState(false)

  return (
    <Row wrapperStyle={[styles.reviewWrapper, wrapperStyle]} justifyContent={'space-between'}>
      <Text style={styles.detailHeader}>{rating || disabled ? '' : 'Оцените событие'}</Text>
      <Rating
        minValue={0.5}
        jumpValue={0.5}
        ratingCount={5}
        imageSize={RW(20)}
        startingValue={rating}
        readonly={!!rating || disabled}
        onFinishRating={(rate) => {
          setDisabled(true)
          onRate?.(rate)
        }}
      />
    </Row>
  )
}

export default Review
