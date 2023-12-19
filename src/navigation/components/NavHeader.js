import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'

import { GRAY, WHITE, RED } from '@/theme/colors'
import { BUTTON_OPACITY } from '@/constants'
import Row from '@/components/masks/Row'
import { RH, RW } from '@/theme/utils'
import { useAuth } from '@/hooks'

const notification = require('@/assets/icons/ic_notification_outline.png')
const backIcon = require('@/assets/icons/ic_arrow_back.png')
const logo = require('@/assets/images/header_logo.png')

const NavHeader = ({ hasBack = false, goBack = undefined, route, hideBell }) => {
  const { me } = useAuth()
  const navigation = useNavigation()

  const _goBack = React.useCallback(() => {
    if (goBack) {
      return goBack()
    }
    navigation.goBack()
  }, [goBack, navigation])

  return (
    <View style={styles.wrapper}>
      <Row>
        {hasBack ? (
          <TouchableOpacity activeOpacity={BUTTON_OPACITY} onPress={_goBack}>
            <FastImage source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>
        ) : (
          <View style={styles.w28} />
        )}
        <FastImage source={logo} style={styles.logo} resizeMode={FastImage.resizeMode.contain} />
      </Row>
      {!hideBell && (
        <TouchableOpacity
          activeOpacity={BUTTON_OPACITY}
          onPress={() => global.preventAction(() => navigation.navigate('Уведомления'))}
        >
          <FastImage
            style={styles.icon}
            source={notification}
            resizeMode={FastImage.resizeMode.contain}
          />
          {!!me?.unread_notifications && <View style={styles.unread} />}
        </TouchableOpacity>
      )}
    </View>
  )
}

export default NavHeader

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderBottomColor: GRAY,
    paddingVertical: RH(20),
    borderBottomWidth: RW(1),
    paddingHorizontal: RW(20),
    justifyContent: 'space-between',
  },
  logo: {
    height: RH(23),
    width: RW(100),
    marginLeft: RW(10),
  },
  w28: {
    width: RW(28),
  },
  icon: {
    width: RW(27),
    height: RW(27),
  },
  backIcon: {
    width: RW(28),
    height: RW(28),
  },
  unread: {
    right: RW(2),
    width: RW(12),
    height: RW(12),
    borderRadius: RW(6),
    position: 'absolute',
    backgroundColor: RED,
  },
})
