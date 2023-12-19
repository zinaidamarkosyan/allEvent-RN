import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Svg, Path } from 'react-native-svg'

import { BUTTON_OPACITY } from '@/constants'
import { RH, RW } from '@/theme/utils'

const PinIcon = ({ color = '#00ADA6', size = 34, onPress }) => {
  const Wrapper = onPress ? TouchableOpacity : View
  return (
    <Wrapper
      onPress={onPress}
      style={{
        height: RW(size + 12),
        width: RW(size + 12),
        alignItems: 'center',
        justifyContent: 'center',
      }}
      activeOpacity={BUTTON_OPACITY}
    >
      <Svg
        width={RW(size)}
        height={RH(45)}
        viewBox="0 0 34 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M16.1143 43.4543L16.1143 43.4543C15.8083 43.1252 11.9787 38.9749 8.22939 33.5553C6.3547 30.8454 4.50864 27.8303 3.13316 24.8262C1.75408 21.8143 0.868921 18.8579 0.868921 16.2535C0.868921 7.81129 7.98774 0.906641 16.7811 0.906641C25.5744 0.906641 32.6931 7.81128 32.6933 16.2535C32.6933 18.8579 31.8081 21.8143 30.4291 24.8262C29.0536 27.8303 27.2075 30.8454 25.3328 33.5553C21.5835 38.9749 17.7539 43.1252 17.448 43.4543L17.4479 43.4543C17.0951 43.8338 16.4676 43.8344 16.1143 43.4543ZM7.8735 16.2535C7.8735 21.0284 11.8887 24.8768 16.7811 24.8768C21.6734 24.8768 25.6886 21.0285 25.6886 16.2536C25.6886 11.4786 21.6734 7.63027 16.7811 7.63027C11.8888 7.63027 7.8735 11.4785 7.8735 16.2535Z"
          stroke={color}
          strokeWidth={RW(1.2)}
        />
      </Svg>
    </Wrapper>
  )
}

export default PinIcon
