import { StyleSheet } from 'react-native'

import { DARK_GRAY, DARK_YELLOW, GRAY, LIGHT_GRAY, WHITE } from '@/theme/colors'
import { font, RH, RW } from '@/theme/utils'

export default StyleSheet.create({
  profileWrapper: {
    paddingTop: RH(45),
    paddingHorizontal: RW(45),
  },
  container: {
    marginTop: RH(30),
    paddingLeft: RW(15),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    marginTop: RH(24),
  },
  title: {
    marginLeft: RW(14),
    ...font('e.regular', 16, DARK_GRAY, 22),
  },
  supportWrapper: {
    paddingTop: RH(50),
    alignItems: 'center',
    paddingHorizontal: RW(22),
  },
  docsWrapper: {
    paddingHorizontal: RW(21),
  },
  docView: {
    flex: 1,
    paddingTop: RH(11),
  },
  doc: {
    borderWidth: RW(1),
    paddingLeft: RW(21),
    borderRadius: RW(20),
    paddingRight: RW(24),
    paddingVertical: RH(17),
    borderColor: LIGHT_GRAY,
  },
  docTitle: {
    maxWidth: '95%',
    ...font('e.regular', 16, DARK_GRAY, 18),
  },
  docText: {
    ...font('e.regular', 16, DARK_GRAY, 22),
  },
  polygon: {
    width: RW(12),
    height: RH(7),
    resizeMode: 'contain',
  },
  mb24: {
    marginBottom: RH(24),
  },
  pageTitle: {
    fontWeight: '700',
    paddingLeft: RW(24),
    ...font('e.bold', 16, DARK_GRAY, 22),
  },
  pt24: {
    paddingTop: RH(24),
  },
  ml22: {
    marginLeft: RW(22),
  },
  ml20: {
    marginLeft: RW(20),
  },
  fullName: {
    ...font('e.regular', 24, DARK_GRAY, 32),
  },
  account: {
    marginTop: RH(5),
    ...font('e.regular', 16, GRAY, 21),
  },
  settings: {
    paddingLeft: RW(25),
    paddingVertical: RH(18),
  },
  settingsTitle: {
    fontWeight: '700',
    ...font('e.bold', 16, DARK_GRAY, 22),
  },
  settingsWrapper: {
    paddingHorizontal: RW(40),
  },
  mt17: {
    marginTop: RH(17),
  },
  br20: {
    borderRadius: RW(20),
  },
  send: {
    width: '80%',
    marginVertical: RH(18),
    backgroundColor: DARK_YELLOW,
  },
  smallText: {
    marginTop: RH(13),
    marginBottom: RH(16),
    ...font('e.regular', 12, DARK_GRAY, 16),
  },
  submit: {
    width: '65%',
    backgroundColor: DARK_YELLOW,
  },
  mb8: {
    marginBottom: RH(8),
  },
  mt32: {
    marginTop: RH(32),
  },
  mt12: {
    marginTop: RH(12),
  },
  mb12: {
    marginBottom: RH(12),
  },
  checkBox: {
    width: RW(20),
    height: RW(20),
    borderRadius: 0,
  },
  settingsNotify: {
    ...font('e.regular', 16, DARK_GRAY, 24),
  },
  mt27: {
    marginTop: RH(27),
  },
  mt50: {
    marginTop: RH(50),
  },
  pb20: { paddingBottom: RH(20) },
  flexStart: { alignItems: 'flex-start' },
  modal: {
    margin: 0,
    paddingHorizontal: RW(62),
  },
  modalContainer: {
    paddingTop: RH(20),
    paddingLeft: RW(20),
    paddingRight: RW(20),
    borderRadius: RW(20),
    paddingBottom: RH(25),
    backgroundColor: WHITE,
  },
  modalTitle: {
    marginTop: RH(3),
    textAlign: 'center',
    marginBottom: RH(14),
    ...font('e.regular', 16, DARK_GRAY, 24),
  },
  modalButton: {
    borderRadius: RW(20),
    alignItems: 'center',
    paddingVertical: RH(5),
    justifyContent: 'center',
    paddingHorizontal: RW(26),
    backgroundColor: DARK_YELLOW,
  },
  inactive: {
    borderWidth: RW(1),
    backgroundColor: WHITE,
    borderColor: DARK_YELLOW,
  },
  label: {
    ...font('e.regular', 14, DARK_YELLOW, 18),
  },
  white: {
    color: WHITE,
  },
  maxWidth: { maxWidth: RW(250) },
  mvBM7T30: {
    marginTop: RH(30),
    marginBottom: RH(-7),
  },
  save: { width: RW(127), backgroundColor: DARK_YELLOW },
  icon: {
    width: RW(23),
    height: RH(23),
    resizeMode: 'contain',
    tintColor: DARK_YELLOW,
  },
  phoneIcon: {
    width: RW(20),
    height: RH(20),
    resizeMode: 'contain',
    tintColor: DARK_YELLOW,
  },
  editIcon: {
    width: RW(23),
    height: RW(23),
  },
  profileIcons: {
    width: RW(25),
    height: RW(25),
  },
})
