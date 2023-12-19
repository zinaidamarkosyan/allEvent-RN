import React from 'react'
import { View, Text } from 'react-native'
import Modal from 'react-native-modal'

import PrimaryButton from '@/components/buttons/primary'
import TextInput from '@/components/inputs/input'
import CloseIcon from '@/assets/icons/close'
import Row from '@/components/masks/Row'
import APICalls from '@/apis/APICalls'

import styles from './sharedStyles'

const SupportModal = ({ onClose = () => null, id, message }) => {
  const [_message, setMessage] = React.useState('')

  const _send = React.useCallback(() => {
    if (!_message.trim()) return
    APICalls.supportCall({ topic: '', message: _message, parent_id: id }).then((res) => {})
    onClose()
  }, [id, _message, onClose])

  return (
    <Modal
      isVisible
      hasBackdrop
      style={styles.modal}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      children={
        <View style={styles.modalContainer}>
          <View style={styles.ph}>
            <Row justifyContent={'space-between'} wrapperStyle={{ alignItems: 'flex-start' }}>
              <Text style={styles.modalTitle}>Ответ от службы поддержки</Text>
              <CloseIcon size={14} onPress={onClose} />
            </Row>
            <Text style={[styles.message, styles.mt20]}>{message}</Text>
            <TextInput
              lines={3}
              value={_message}
              onChange={setMessage}
              placeholder={'Ответ'}
              wrapperStyle={styles.mt20}
            />
            <PrimaryButton
              onPress={_send}
              withOutOldStyles
              label={'Подтведить'}
              labelStyle={styles.label}
              wrapperStyle={[styles.btn, styles.mt20]}
            />
          </View>
        </View>
      }
    />
  )
}

export default SupportModal
