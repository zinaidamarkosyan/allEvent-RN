import React from 'react'
import Modal from 'react-native-modal'
import FastImage from 'react-native-fast-image'

import loadingSpinner from '@/assets/images/loading.gif'
import { RW } from '@/theme/utils'

const Loader = () => {
  return (
    <Modal
      isVisible
      hasBackdrop
      animationIn={'fadeIn'}
      style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
      children={<FastImage source={loadingSpinner} style={{ width: RW(50), height: RW(50) }} />}
    />
  )
}

export default Loader
