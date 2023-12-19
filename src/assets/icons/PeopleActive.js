import React from 'react'
import { Svg, Path } from 'react-native-svg'

import { RW, RH } from '@/theme/utils'

const PeopleActiveIcon = ({ color = '#A3A3A3', size = 25 }) => {
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
        d="M9.91896 24.0299C5.16924 24.0299 1.11304 23.2908 1.11304 20.3306C1.11304 17.3706 5.14351 14.6379 9.91896 14.6379C14.6688 14.6379 18.725 17.3441 18.725 20.3043C18.725 23.2631 14.6946 24.0299 9.91896 24.0299Z"
        fill={color}
        stroke={color}
        strokeWidth={RW(1.5)}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.90939 12.2878C13.0265 12.2878 15.5528 9.76154 15.5528 6.64454C15.5528 3.52753 13.0265 1 9.90939 1C6.79244 1 4.26493 3.52753 4.26493 6.64454C4.2544 9.75102 6.76321 12.2774 9.86964 12.2878C9.88366 12.2878 9.89652 12.2878 9.90939 12.2878Z"
        fill={color}
        stroke={color}
        strokeWidth={RW(1.5)}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default PeopleActiveIcon
