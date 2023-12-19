import { StyleSheet } from 'react-native'

import { DARK_GRAY, DARK_YELLOW, GRAY, GREEN, RED, WHITE } from '@/theme/colors'
import { font, RH, RW } from '@/theme/utils'

export default StyleSheet.create({
  wrapper: {
    paddingTop: RH(33),
    paddingHorizontal: RW(24),
  },
  pageTitle: {
    fontWeight: '600',
    ...font('e.medium', 16, DARK_GRAY, 24),
  },
  pt11: {
    paddingTop: RH(11),
    paddingLeft: RW(11),
  },
  mt18: {
    marginTop: RH(18),
  },
  ml25: {
    marginLeft: RW(25),
  },
  action: {
    paddingTop: RH(30),
    paddingRight: RW(20),
    alignItems: 'flex-end',
  },
  pageAction: {
    fontWeight: '700',
    ...font('e.bold', 14, GREEN, 19),
  },
  padding: {
    paddingLeft: RW(24),
    paddingRight: RW(10),
    // paddingVertical: RH(36),
  },
  profileWrapper: {
    paddingTop: RH(45),
    paddingLeft: RW(45),
    paddingRight: RW(40),
  },
  fullName: {
    marginLeft: RW(23),
    ...font('e.regular', 24, DARK_GRAY, 32),
  },
  title: {
    fontWeight: '700',
    ...font('e.bold', 16, DARK_GRAY, 24),
  },
  mt60: {
    marginTop: RH(60),
  },
  mb25: {
    marginBottom: RH(25),
  },
  mt35: {
    marginTop: RH(35),
  },
  mb16: {
    marginBottom: RH(16),
  },
  rate: {
    fontWeight: '600',
    marginLeft: RW(10),
    ...font('e.medium', 14, GRAY, 20),
  },
  img: {
    width: RW(105),
    height: RH(185),
    marginLeft: RW(13),
  },
  commentUser: {
    fontWeight: '600',
    ...font('e.medium', 14, DARK_GRAY, 16),
  },
  commentLikes: {
    fontWeight: '500',
    marginRight: RW(6),
    ...font('e.medium', 14, DARK_GRAY, 20),
  },
  comment: {
    ...font('e.regular', 12, DARK_GRAY, 16),
  },
  reply: {
    fontWeight: '600',
    ...font('e.medium', 12, GREEN, 16),
  },
  complain: {
    fontWeight: '600',
    marginLeft: RW(15),
    ...font('e.medium', 12, RED, 16),
  },
  modal: {
    margin: 0,
    paddingHorizontal: RW(30),
  },
  modalContainer: {
    paddingLeft: RW(31),
    paddingRight: RW(33),
    borderRadius: RW(20),
    backgroundColor: WHITE,
    paddingVertical: RH(35),
  },
  modalTitle: {
    fontWeight: '600',
    ...font('e.medium', 16, DARK_GRAY, 24),
  },
  itemTitle: {
    ...font('e.regular', 16, GRAY, 24),
  },
  checkBox: {
    width: RW(20),
    height: RW(20),
    borderRadius: 0,
  },
  label: {
    ...font('e.regular', 14, WHITE, 24),
  },
  btn: {
    width: RW(135),
    borderRadius: RW(20),
    alignItems: 'center',
    paddingVertical: RH(2),
    justifyContent: 'center',
    backgroundColor: DARK_YELLOW,
  },
  mt23: {
    marginTop: RH(23),
  },
  mt28: {
    marginTop: RH(28),
  },
  mt20: {
    marginTop: RH(20),
  },
  ph: {
    paddingLeft: RW(17),
    paddingRight: RW(14),
  },
  message: {
    ...font('e.regular', 15, DARK_GRAY, 20),
  },
  ml10: {
    width: '89%',
    marginLeft: RW(10),
  },
  items: {
    marginTop: RH(19),
    marginBottom: RH(10),
  },
  pl16: {
    paddingLeft: RW(35),
  },
  heartIcon: {
    width: RW(19),
    height: RW(19),
  },
})
