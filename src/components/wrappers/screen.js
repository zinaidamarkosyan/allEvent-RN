import React from 'react'
import { StyleSheet, View } from 'react-native'

import Loader from '@/components/FullScreenLoader/loading'
import NavHeader from '@/navigation/components/NavHeader'
import { WHITE } from '@/theme/colors'

const ScreenWrapperWithNavigation = ({
  children,
  goBack,
  loading = false,
  hasBack = false,
  wrapperStyle,
  route,
  hideBell = false,
}) => (
  <View style={styles.container}>
    {loading && <Loader />}
    <NavHeader hasBack={hasBack} goBack={goBack} route={route} hideBell={hideBell} />
    <View style={[styles.area, wrapperStyle]}>{children}</View>
  </View>
)

const styles = StyleSheet.create({
  area: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
    flexDirection: 'column',
  },
})

export default ScreenWrapperWithNavigation
