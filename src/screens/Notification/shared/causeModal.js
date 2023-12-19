import React from 'react'
import { View, Text } from 'react-native'
import Modal from 'react-native-modal'

import PrimaryButton from '@/components/buttons/primary'
import CheckBox from '@/components/buttons/CheckBox'
import TextInput from '@/components/inputs/input'
import CloseIcon from '@/assets/icons/close'
import Row from '@/components/masks/Row'

import styles from './sharedStyles'

const CauseModal = ({ onConfirm = (cause) => undefined, onClose = () => null }) => {
  const [other, setOther] = React.useState(undefined)
  const [selected, setSelected] = React.useState(undefined)

  const _confirm = React.useCallback(() => {
    if (!other && !selected) return
    onConfirm(other ?? selected)
    onClose()
  }, [other, selected, onClose, onConfirm])

  const TYPES = [
    {
      key: 'notHaveTime',
      title: 'Не успел',
    },
    {
      key: 'changedMind',
      title: 'Передумал',
    },
    {
      key: 'notInteresting',
      title: 'Не интересно',
    },
    {
      key: 'other',
      title: 'Другая причина',
    },
  ]

  const isVisible = selected === 'other'

  return (
    <Modal
      isVisible
      hasBackdrop
      style={styles.modal}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      children={
        <View style={styles.modalContainer}>
          <Row justifyContent={'space-between'} wrapperStyle={{ alignItems: 'flex-start' }}>
            <Text style={styles.modalTitle}>Пожалуйста назовите причину</Text>
            <CloseIcon size={14} onPress={onClose} />
          </Row>
          <View style={styles.ph}>
            {TYPES.map((type, idx) => {
              return (
                <Row key={idx.toString()} wrapperStyle={styles.mt18}>
                  <CheckBox
                    withIcon
                    itemStyle={styles.checkBox}
                    isActive={type.key === selected}
                    onCheck={() => setSelected(type.key)}
                  />
                  <Text style={styles.itemTitle}>{type.title}</Text>
                </Row>
              )
            })}
            {isVisible && (
              <TextInput
                value={other}
                onChange={setOther}
                placeholder={'Причина'}
                wrapperStyle={styles.mt23}
              />
            )}
            <PrimaryButton
              withOutOldStyles
              onPress={_confirm}
              label={'Подтведить'}
              labelStyle={styles.label}
              wrapperStyle={[styles.btn, isVisible ? styles.mt20 : styles.mt28]}
            />
          </View>
        </View>
      }
    />
  )
}

export default CauseModal
