import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { CalloutSubview } from 'react-native-maps'
import FastImage from 'react-native-fast-image'
import moment from 'moment-timezone'

import { DARK_GRAY, DARK_YELLOW, WHITE } from '@/theme/colors'
import PrimaryButton from '@/components/buttons/primary'
import { font, RH, RW } from '@/theme/utils'
import { IS_IOS } from '@/constants'

const MapCallout = React.forwardRef(({ id, title, createdAt, image }, ref) => {
  const navigation = useNavigation()

  const openDetail = React.useCallback(() => {
    navigation.navigate('Главная', {
      screen: 'Detail',
      params: {
        id,
        refScreen: 'Карта',
      },
    })
  }, [id, navigation])

  React.useImperativeHandle(
    ref,
    () => {
      return {
        openDetail,
      }
    },
    [openDetail],
  )

  const SubView = IS_IOS ? CalloutSubview : View
  return (
    <View style={styles.wrapper}>
      <View style={{ justifyContent: 'space-around' }}>
        <View>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode={'tail'}>
            {title}
          </Text>
          <Text style={styles.subTitle}>
            <Text style={styles.fw600}>Дата: </Text>
            {moment(createdAt).format('DD.MM.YYYY')}
          </Text>
          <Text style={styles.subTitle} numberOfLines={2} ellipsizeMode={'tail'}>
            <Text style={styles.fw600}>Время: </Text>
            {moment(createdAt).format('HH:mm')}
          </Text>
        </View>
        <SubView onPress={openDetail}>
          <PrimaryButton
            label={'Перейти'}
            onPress={openDetail}
            labelStyle={styles.buttonLabel}
            wrapperStyle={styles.buttonWrapper}
          />
        </SubView>
      </View>
      <Text>
        {!!image && (
          <FastImage
            style={styles.img}
            source={{ uri: image }}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}
      </Text>
    </View>
  )
})

export default MapCallout

const styles = StyleSheet.create({
  wrapper: {
    width: RW(345),
    borderRadius: RW(5),
    flexDirection: 'row',
    backgroundColor: WHITE,
    paddingVertical: RH(12),
    paddingHorizontal: RW(12),
    justifyContent: 'space-between',
  },
  img: {
    width: RW(122),
    height: RH(164),
    borderRadius: RW(5),
  },
  title: {
    width: RW(190),
    marginTop: RH(2),
    fontWeight: '700',
    marginBottom: RH(16),
    ...font('e.bold', 16, DARK_GRAY, 22),
  },
  subTitle: {
    width: RW(150),
    ...font('e.regular', 14, DARK_GRAY, 24),
  },
  fw600: {
    fontWeight: '600',
  },
  buttonWrapper: {
    width: RW(113),
    marginTop: RH(11),
    borderRadius: RW(20),
    paddingVertical: RH(2),
    paddingHorizontal: RW(26),
    backgroundColor: DARK_YELLOW,
  },
  buttonLabel: {
    ...font('e.regular', 14, WHITE),
  },
})
