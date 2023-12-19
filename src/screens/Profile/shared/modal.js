import React from 'react'
import { Text, View } from 'react-native'
import Modal from 'react-native-modal'

import PrimaryButton from '@/components/buttons/primary'
import CloseIcon from '@/assets/icons/close'
import Row from '@/components/masks/Row'

import styles from './sharedStyles'

const ProfileModal = ({
  withButtons = true,
  title,
  onClose = () => null,
  onConfirm = () => null,
}) => {
  const _onConfirm = React.useCallback(() => {
    onConfirm()
    onClose()
  }, [onConfirm, onClose])

  return (
    <Modal
      isVisible
      hasBackdrop
      style={styles.modal}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      children={
        <View style={styles.modalContainer}>
          <View style={{ alignItems: 'flex-end' }}>
            <CloseIcon onPress={onClose} />
          </View>
          <Text style={styles.modalTitle}>{title}</Text>
          {withButtons && (
            <Row justifyContent={'space-evenly'}>
              <PrimaryButton
                label={'Да'}
                withOutOldStyles
                wrapperStyle={[styles.modalButton]}
                labelStyle={[styles.label, styles.white]}
                onPress={_onConfirm}
              />
              <PrimaryButton
                label={'Нет'}
                withOutOldStyles
                wrapperStyle={[styles.modalButton, styles.inactive]}
                labelStyle={styles.label}
                onPress={onClose}
              />
            </Row>
          )}
        </View>
      }
    />
  )
}

export default ProfileModal
