import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Loading from '@/components/FullScreenLoader/loading'
import NavBack from '@/components/buttons/NavBack'
import { GRAY, WHITE } from '@/theme/colors'
import { RW } from '@/theme/utils'

const AuthScreenWrapper = ({
  children,
  loading,
  hasBack = false,
  wrapperStyle,
  scrollEnabled = false,
}) => {
  const Wrapper = scrollEnabled ? KeyboardAwareScrollView : View
  return (
    <View style={styles.container}>
      {loading && <Loading color={[GRAY, GRAY]} />}
      {hasBack && <NavBack />}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Wrapper
          scrollEnabled
          enableOnAndroid
          showsVerticalScrollIndicator={false}
          style={[styles.area, wrapperStyle]}
        >
          {children}
        </Wrapper>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: RW(74),
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
    flexDirection: 'column',
  },
})

export default AuthScreenWrapper
