import React from 'react'
import { Svg, Path } from 'react-native-svg'

import { RW, RH } from '@/theme/utils'

const PeopleIcon = ({ color = '#A3A3A3', size = 25 }) => {
  return (
    <Svg
      width={RW(size)}
      height={RH(size)}
      viewBox="0 0 20 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.72487 24.0299C4.97515 24.0299 0.918945 23.2908 0.918945 20.3306C0.918945 17.3706 4.94942 14.6379 9.72487 14.6379C14.4748 14.6379 18.5309 17.3441 18.5309 20.3043C18.5309 23.2631 14.5005 24.0299 9.72487 24.0299Z"
        stroke={color}
        strokeWidth={RW(1.5)}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.7153 12.2878C12.8324 12.2878 15.3587 9.76154 15.3587 6.64454C15.3587 3.52753 12.8324 1 9.7153 1C6.59835 1 4.07083 3.52753 4.07083 6.64454C4.06031 9.75102 6.56912 12.2774 9.67554 12.2878C9.68957 12.2878 9.70243 12.2878 9.7153 12.2878Z"
        stroke={color}
        strokeWidth={RW(1.5)}
        trokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default PeopleIcon
