import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Svg, Path } from 'react-native-svg'

import { BUTTON_OPACITY } from '@/constants'
import { RW, RH } from '@/theme/utils'

const PencelIcon = ({ color = '#A3A3A3', size = 23, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={BUTTON_OPACITY} onPress={onPress && onPress}>
      <Svg
        width={RW(size)}
        height={RH(size)}
        viewBox="0 0 23 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M22.2109 2.55547L20.2173 0.652345C19.3064 -0.217143 17.8245 -0.217102 16.9136 0.652345C16.056 1.47106 2.9567 13.9758 2.0813 14.8115C1.98805 14.9005 1.92558 15.0188 1.90332 15.1345L0.906533 20.2729C0.867905 20.4721 0.93442 20.6768 1.08451 20.82C1.23477 20.9634 1.44918 21.0268 1.65763 20.9899L7.04027 20.0383C7.16466 20.0162 7.28695 19.956 7.37865 19.8684L22.2109 5.70928C23.1239 4.83778 23.124 3.42709 22.2109 2.55547ZM2.34469 19.617L2.94767 16.5087L5.60082 19.0414L2.34469 19.617ZM6.92292 18.5633L3.44852 15.2466L16.1333 3.13744L19.6077 6.45416L6.92292 18.5633ZM21.2994 4.83921L20.5192 5.5841L17.0448 2.26737L17.825 1.52249C18.2333 1.13276 18.8975 1.13272 19.3058 1.52249L21.2994 3.42561C21.7087 3.81628 21.7087 4.4485 21.2994 4.83921Z"
          fill={color}
        />
      </Svg>
    </TouchableOpacity>
  )
}

export default PencelIcon
