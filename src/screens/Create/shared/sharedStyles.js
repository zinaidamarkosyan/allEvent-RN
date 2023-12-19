import { StyleSheet } from 'react-native'

import { DARK_GRAY, DARK_YELLOW, GRAY, GREEN, LIGHT_GRAY, RED, WHITE } from '@/theme/colors'
import { font, RH, RW } from '@/theme/utils'

export default StyleSheet.create({
  wrapper: {
    paddingTop: RH(34),
    paddingBottom: RH(25),
    paddingHorizontal: RW(24),
  },
  title: {
    fontWeight: '700',
    ...font('e.bold', 16, DARK_GRAY, 24),
  },
  mr14: {
    marginRight: RW(14),
  },
  mt16: {
    marginTop: RH(16),
  },
  mb16: {
    marginBottom: RH(16),
  },
  mt33: {
    marginTop: RH(33),
  },
  mt25: {
    marginTop: RH(25),
  },
  pl50: {
    paddingLeft: RW(50),
  },
  inputWrapper: {
    borderWidth: RW(1),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RW(30),
    paddingVertical: RH(13),
    borderColor: LIGHT_GRAY,
    paddingHorizontal: RW(16),
  },
  inputLabel: {
    paddingVertical: 0,
    marginLeft: RW(18),
    ...font('e.regular', 16, GRAY, 19),
  },
  download: {
    marginLeft: RW(20),
    ...font('e.regular', 16, DARK_GRAY, 22),
  },
  dropdownWrapper: {
    borderWidth: RW(1),
    borderRadius: RW(30),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: RH(10),
    borderColor: LIGHT_GRAY,
    paddingHorizontal: RW(24),
    justifyContent: 'space-between',
  },
  error: {
    borderColor: RED,
  },
  dropdownLabel: {
    ...font('e.regular', 16, DARK_GRAY, 22),
  },
  dropdownItem: {
    marginTop: RH(12),
    ...font('e.regular', 16, GRAY, 22),
  },
  dropdownItemWrapper: {
    flex: 1,
    top: RH(60),
    zIndex: 999,
    width: '100%',
    maxHeight: RH(250),
    borderWidth: RW(1),
    position: 'absolute',
    borderRadius: RW(20),
    borderColor: LIGHT_GRAY,
    backgroundColor: WHITE,
  },
  dropdownItemContainer: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    paddingLeft: RW(24),
    marginVertical: RH(11),
    backgroundColor: WHITE,
  },
  imageWrapper: {
    width: RW(90),
    height: RW(90),
    alignItems: 'center',
    borderRadius: RW(10),
    justifyContent: 'center',
    backgroundColor: LIGHT_GRAY,
  },
  ph56: {
    paddingHorizontal: RW(56),
  },
  modalContainer: {
    borderRadius: RW(20),
    backgroundColor: WHITE,
    paddingVertical: RH(25),
    paddingHorizontal: RW(30),
  },
  created: {
    fontWeight: '600',
    textAlign: 'center',
    ...font('e.medium', 16, DARK_GRAY, 24),
  },
  otherCategoryModal: {
    paddingTop: RH(25),
    borderRadius: RW(20),
    paddingBottom: RH(20),
    backgroundColor: WHITE,
    paddingHorizontal: RW(20),
  },
  mt14: {
    marginTop: RH(14),
  },
  submit: {
    width: RW(144),
    alignSelf: 'center',
    backgroundColor: DARK_YELLOW,
  },
  mt20: {
    marginTop: RH(20),
  },
  close: {
    width: RW(24),
    height: RW(24),
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  permission: {
    width: 'auto',
    marginTop: RH(15),
    paddingVertical: RH(7),
    paddingHorizontal: RW(14),
  },
  permissionCancel: {
    borderColor: GREEN,
    borderWidth: RW(1),
    backgroundColor: WHITE,
  },
  inactive: {
    ...font('e.regular', 13, GREEN),
  },
  icon: {
    width: RW(20),
    height: RW(20),
    tintColor: GREEN,
  },
  calendarIcon: {
    width: RW(20),
    height: RW(20),
  },
})
