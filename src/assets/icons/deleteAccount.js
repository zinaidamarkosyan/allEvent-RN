import React from 'react'
import { Svg, Path } from 'react-native-svg'

import { RW } from '@/theme/utils'

const DeleteIcon = ({ color = '#FDB737', size = 18 }) => {
  return (
    <Svg
      width={RW(size)}
      height={RW(size)}
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.66873 16.9035C3.36885 16.9035 0.550781 16.39 0.550781 14.3334C0.550781 12.277 3.35097 10.3784 6.66873 10.3784C9.96873 10.3784 12.7868 12.2585 12.7868 14.3151C12.7868 16.3708 9.98661 16.9035 6.66873 16.9035Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.66177 8.74559C8.82739 8.74559 10.5825 6.99043 10.5825 4.82489C10.5825 2.65933 8.82739 0.90332 6.66177 0.90332C4.49626 0.90332 2.74026 2.65933 2.74026 4.82489C2.73295 6.98312 4.47595 8.73835 6.63415 8.74559C6.64389 8.74559 6.65283 8.74559 6.66177 8.74559Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M4.82324 11.7959L8.51368 15.4863" stroke={color} />
      <Path d="M8.51367 11.7959L4.82323 15.4863" stroke={color} />
    </Svg>
  )
}

export default DeleteIcon
