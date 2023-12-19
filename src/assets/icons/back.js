import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Svg, Path } from 'react-native-svg'

import { BUTTON_OPACITY } from '@/constants'
import { RH, RW } from '@/theme/utils'

const BackIcon = ({ color = '#A3A3A3', onPress }) => {
  return (
    <TouchableOpacity activeOpacity={BUTTON_OPACITY} onPress={onPress && onPress}>
      <Svg
        width={RW(28)}
        height={RH(16)}
        viewBox="0 0 28 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M0.580735 7.29289C0.190211 7.68342 0.190211 8.31658 0.580735 8.70711L6.9447 15.0711C7.33522 15.4616 7.96839 15.4616 8.35891 15.0711C8.74943 14.6805 8.74943 14.0474 8.35891 13.6569L2.70206 8L8.35891 2.34315C8.74943 1.95262 8.74943 1.31946 8.35891 0.928932C7.96839 0.538408 7.33522 0.538408 6.9447 0.928932L0.580735 7.29289ZM27.3105 7H1.28784V9H27.3105V7Z"
          fill={color}
        />
      </Svg>
    </TouchableOpacity>
  )
}

export default BackIcon
