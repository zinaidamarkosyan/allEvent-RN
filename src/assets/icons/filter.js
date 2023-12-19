import React from 'react'
import { Svg, Path } from 'react-native-svg'

import { RW } from '@/theme/utils'

const FilterIcon = ({ color = '#FDB737', size = 22, fill = null }) => {
  return (
    <Svg
      width={RW(size)}
      height={RW(size)}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M9.05885 10.1553L9.05805 10.1544L1.49973 1.95519C1.49968 1.95514 1.49964 1.95509 1.49959 1.95504C1.37436 1.81874 1.47033 1.6001 1.65505 1.6001H20.3061C20.4883 1.6001 20.5866 1.81918 20.4613 1.95527L12.9031 10.1566L12.9031 10.1566L12.8998 10.1601C12.5605 10.533 12.367 11.022 12.367 11.5323V17.3604C12.367 17.4298 12.3574 17.4563 12.3293 17.5042C12.3079 17.5404 12.2743 17.5888 12.2162 17.6623C12.1694 17.7214 12.1177 17.7832 12.0527 17.861C12.0359 17.8812 12.0182 17.9024 11.9994 17.9248L9.59416 20.6812V11.5301C9.59416 11.0229 9.40477 10.5317 9.05885 10.1553Z"
        fill={fill}
        stroke={fill || color}
        strokeWidth={RW(1.5)}
      />
    </Svg>
  )
}

export default FilterIcon
