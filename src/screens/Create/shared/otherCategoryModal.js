import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'

import PrimaryButton from '@/components/buttons/primary'
import TextInput from '@/components/inputs/input'
import CloseIcon from '@/assets/icons/close'
import { BUTTON_OPACITY } from '@/constants'
import APICalls from '@/apis/APICalls'

import styles from './sharedStyles'

const OtherCategory = ({ onClose = () => null, cb = () => null }) => {
  const [name, setName] = React.useState(null)
  const [description, setDescription] = React.useState(null)

  const _onSubmit = React.useCallback(() => {
    if (!name || !description) return
    onClose()
    APICalls.createCategory({ name, description }).then((res) => {
      if (res.success) {
        cb()
      }
    })
  }, [name, description, onClose, cb])

  return (
    <Modal
      isVisible
      hasBackdrop
      style={styles.ph56}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      children={
        <View style={styles.otherCategoryModal}>
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={BUTTON_OPACITY}
            style={{ alignSelf: 'flex-end' }}
          >
            <CloseIcon size={14} />
          </TouchableOpacity>
          <TextInput
            value={name}
            onChange={setName}
            wrapperStyle={styles.mt25}
            placeholder={'Другая категория'}
          />
          <TextInput
            lines={4}
            maxLength={100}
            value={description}
            onChange={setDescription}
            wrapperStyle={styles.mt14}
            placeholder={'Описание'}
          />
          <PrimaryButton
            onPress={_onSubmit}
            label={'Подтвердить'}
            wrapperStyle={[styles.submit, styles.mt20]}
          />
        </View>
      }
    />
  )
}

export default OtherCategory
