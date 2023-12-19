import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'

import CloseIcon from '@/assets/icons/close'
import { BUTTON_OPACITY } from '@/constants'

import styles from './sharedStyles'

const CreatedCategoryModal = ({ onClose }) => {
  return (
    <Modal
      isVisible
      hasBackdrop
      style={styles.ph56}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      children={
        <View style={styles.modalContainer}>
          <TouchableOpacity
            activeOpacity={BUTTON_OPACITY}
            style={{ alignSelf: 'flex-end' }}
            onPress={onClose && onClose}
          >
            <CloseIcon size={14} />
          </TouchableOpacity>
          <Text style={styles.created}>
            {
              'Добавленная категория\n находиться на рассмотрении.\nПосле принятия\nадминистратором данной\nкатегории, вы сможете\nдобавить событие.'
            }
          </Text>
        </View>
      }
    />
  )
}

export default CreatedCategoryModal
