import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'

import CloseIcon from '@/assets/icons/close'
import { BUTTON_OPACITY } from '@/constants'
import { GREEN } from '@/theme/colors'

import styles from './sharedStyles'

const CreatedEventModal = ({ onClose, onOk = () => undefined, title }) => {
  return (
    <Modal
      isVisible
      hasBackdrop
      style={styles.ph56}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      children={
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose} style={styles.close} activeOpacity={BUTTON_OPACITY}>
            <CloseIcon size={14} onPress={onClose} />
          </TouchableOpacity>
          <Text style={styles.created}>{title}</Text>
          <Text
            style={[styles.title, { color: GREEN, textAlign: 'center' }, styles.mt14]}
            onPress={onOk}
          >
            ОК
          </Text>
        </View>
      }
    />
  )
}

export default CreatedEventModal
