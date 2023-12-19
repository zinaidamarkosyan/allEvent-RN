import React from 'react'
import { Text, View, Linking } from 'react-native'
import Modal from 'react-native-modal'

import PrimaryButton from '@/components/buttons/primary'
import Row from '@/components/masks/Row'
import { WHITE } from '@/theme/colors'
import { IS_IOS } from '@/constants'
import { useAuth } from '@/hooks'

import styles from './sharedStyles'

const PermissionsModal = () => {
  const { setPermission, permission } = useAuth()

  return (
    <Modal
      isVisible
      hasBackdrop
      style={styles.ph56}
      onBackdropPress={() => setPermission('')}
      onBackButtonPress={() => setPermission('')}
      children={
        <View style={styles.modalContainer}>
          <Text style={styles.created}>Приложение "Alleven" запрашивает доступ к {permission}</Text>
          <Row wrapperStyle={{ justifyContent: 'space-between' }}>
            <PrimaryButton
              label={'Запретить'}
              labelStyle={styles.inactive}
              onPress={() => setPermission('')}
              wrapperStyle={[styles.permission, styles.permissionCancel]}
            />

            <PrimaryButton
              wrapperStyle={styles.permission}
              labelStyle={[styles.inactive, { color: WHITE }]}
              label={'Разрешить'}
              onPress={() => {
                setPermission('')
                !IS_IOS ? Linking.openSettings() : Linking.openURL('app-settings:')
              }}
            />
          </Row>
        </View>
      }
    />
  )
}

export default PermissionsModal
