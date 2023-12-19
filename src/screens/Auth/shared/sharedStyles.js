import { StyleSheet } from 'react-native'

import { DARK_GRAY, LIGHT_GRAY, GRAY, GREEN, WHITE } from '@/theme/colors'
import { font, RH, RW } from '@/theme/utils'

export default StyleSheet.create({
  signUpTitle: {
    textAlign: 'center',
    ...font('e.regular', 14, DARK_GRAY, 24),
  },
  logo: {
    width: RW(123),
    height: RW(124),
    marginTop: RH(140),
    alignSelf: 'center',
    marginBottom: RH(50),
  },
  title: {
    marginTop: RH(32),
    marginBottom: RH(16),
    ...font('e.regular', 16, DARK_GRAY, 22),
  },
  mt10: {
    marginTop: RH(10),
  },
  ml20: {
    marginLeft: RW(20),
  },
  mt45: {
    marginTop: RH(45),
  },
  smallText: {
    marginTop: RH(12),
    marginBottom: RH(18),
    ...font('e.regular', 12, DARK_GRAY, 16),
  },
  mb9: {
    marginBottom: RH(9),
  },
  configurationTitle: {
    fontWeight: '600',
    marginTop: RH(198),
    alignSelf: 'center',
    ...font('e.medium', 24, DARK_GRAY, 32),
  },
  wrapper: {
    paddingHorizontal: RH(62),
  },
  biometric: {
    marginTop: RH(38),
    marginBottom: RH(32),
  },
  pinCodeLink: {
    marginTop: RH(15),
  },
  back: {
    marginTop: RH(14),
    borderColor: GREEN,
    borderWidth: RW(1),
    backgroundColor: WHITE,
  },
  backLabel: {
    color: GREEN,
  },
  centered: {
    alignItems: 'center',
  },
  lock: {
    paddingTop: RH(142),
    marginBottom: RH(12),
  },
  pageTitle: {
    ...font('e.regular', 20, DARK_GRAY, 27),
  },
  sub: {
    marginTop: RH(15),
    marginBottom: RH(26),
  },
  mt27: {
    marginTop: RH(27),
  },
  mb27: {
    marginBottom: RH(27),
  },
  mv16: {
    marginVertical: RH(16),
  },
  signIn: {
    alignSelf: 'center',
    marginBottom: RH(26),
  },
  bottom: {
    marginTop: RH(165),
  },
  disabled: {
    backgroundColor: LIGHT_GRAY,
  },
  disabledLabel: {
    color: GRAY,
  },
  useterms: {
    ...font('medium', 14, DARK_GRAY, 17),
  },
  mt18: {
    marginTop: RH(18),
  },
})
