import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ActionSheet, { registerSheet } from 'react-native-actions-sheet'

import Biometric from '@/components/buttons/Biometric'
import { font, RH, RW } from '@/theme/utils'
import { DARK_GRAY } from '@/theme/colors'
import Row from '@/components/masks/Row'
import { useAuth } from '@/hooks'

const LoginSheet = (props) => {
  const { onSuccess } = useAuth()
  return (
    <ActionSheet id={props.sheetId}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Использовать отпечаток пальца, или идентификатор лица</Text>
        <Row justifyContent={'center'}>
          <Biometric onSuccess={onSuccess} />
        </Row>
      </View>
    </ActionSheet>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: RH(30),
    paddingBottom: RH(40),
    paddingHorizontal: RW(60),
  },
  title: {
    marginBottom: RH(23),
    ...font('e.regular', 16, DARK_GRAY, 22),
  },
})

registerSheet('biometricLogin', LoginSheet)

export default LoginSheet
