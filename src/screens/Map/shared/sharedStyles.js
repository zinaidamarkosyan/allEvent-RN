import { StyleSheet } from 'react-native'

import { font, RH, RW, shadow } from '@/theme/utils'
import { DARK_GRAY, WHITE } from '@/theme/colors'

export default StyleSheet.create({
  filterButton: {
    ...shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginRight: RW(8),
    borderRadius: RW(20),
    marginVertical: RH(13),
    backgroundColor: WHITE,
    paddingVertical: RH(6),
    paddingHorizontal: RW(10),
  },
  label: {
    ...font('e.regular', 14, DARK_GRAY, 19),
  },
  ph: {
    zIndex: 999,
    width: '100%',
    position: 'absolute',
    paddingHorizontal: RW(10),
  },
  withoutLocation: {
    // width: RW(350),
    // backgroundColor: 'red',
    textAlign: 'center',
    ...font('e.medium', 16, DARK_GRAY),
    textDecorationLine: 'underline',
  },
  myLocation: {
    zIndex: 2,
    ...shadow,
    right: RW(23),
    width: RW(62),
    height: RW(62),
    bottom: RH(23),
    position: 'absolute',
    alignItems: 'center',
    borderRadius: RW(31),
    backgroundColor: WHITE,
    justifyContent: 'center',
  },
  icon: {
    width: RW(22),
    height: RW(22),
  },
})
