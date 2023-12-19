import { StyleSheet } from 'react-native'

import {
  BLACK,
  DARK_GRAY,
  DARK_YELLOW,
  GRAY,
  GREEN,
  LIGHT_GRAY,
  RED,
  WHITE,
  YELLOW,
} from '@/theme/colors'
import { font, RH, RW, shadow } from '@/theme/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  homeWrapper: {
    paddingHorizontal: RW(26),
  },
  pv15: {
    paddingVertical: RH(15),
  },
  eventCard: {
    marginTop: RH(15),
    borderWidth: RW(1),
    paddingLeft: RW(19),
    paddingRight: RW(15),
    borderRadius: RW(20),
    paddingVertical: RH(15),
    borderColor: LIGHT_GRAY,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  eventCardImg: {
    width: RW(94),
    height: RH(94),
  },
  aboutEvent: {
    width: RW(229),
    marginLeft: RW(22),
  },
  eventTitle: {
    ...font('e.regular', 18, DARK_GRAY, 24),
  },
  eventDescription: {
    marginTop: RH(8),
    ...font('e.regular', 12, DARK_GRAY, 20),
  },
  subEvent: {
    borderTopWidth: RW(1),
    paddingVertical: RH(16),
    borderBottomWidth: RW(1),
    paddingHorizontal: RW(24),
    borderTopColor: LIGHT_GRAY,
    borderBottomColor: LIGHT_GRAY,
    justifyContent: 'space-between',
  },
  subEventTitle: {
    width: RW(250),
    fontWeight: '700',
    marginBottom: RH(16),
    ...font('e.bold', 16, GREEN, 22),
  },
  subEventInfo: {
    fontWeight: '600',
    ...font('e.regular', 14, GRAY, 20),
  },
  w40: {
    width: RW(250),
  },
  history: {
    marginTop: RH(17),
    color: DARK_YELLOW,
    textDecorationLine: 'underline',
  },
  mb9: {
    marginBottom: RH(9),
  },
  mb5: {
    marginBottom: RH(5),
  },
  count: {
    marginLeft: RW(5),
    marginRight: RW(7),
  },
  subEventImg: {
    width: RW(120),
    height: RH(170),
    borderRadius: RW(5),
  },
  filterTitle: {
    fontWeight: '600',
    ...font('e.medium', 12, GRAY, 16),
  },
  cover: {
    width: '100%',
    height: RH(400),
  },
  detailTitleWrapper: {
    paddingTop: RH(20),
    paddingLeft: RW(20),
    paddingRight: RW(30),
    paddingBottom: RH(27),
    justifyContent: 'space-between',
  },
  detailTitle: {
    maxWidth: RW(330),
    fontWeight: '700',
    ...font('e.bold', 24, GREEN, 32),
  },
  maxWidth: {
    maxWidth: RW(285),
  },
  detailHeader: {
    fontWeight: '600',
    ...font('e.medium', 18, DARK_GRAY, 20),
  },
  detailDescription: {
    ...font('e.regular', 14, DARK_GRAY, 20),
  },
  link: {
    color: GRAY,
    textDecorationLine: 'underline',
  },
  mh8: {
    marginHorizontal: RW(8),
  },
  ph27: {
    paddingHorizontal: RW(27),
  },
  pl27: {
    paddingLeft: RW(27),
  },
  mb22: {
    marginBottom: RH(22),
  },
  mt16: {
    marginTop: RH(16),
  },
  mt32: {
    marginTop: RH(32),
  },
  mt20: {
    marginTop: RH(20),
  },
  mr20: {
    marginRight: RW(20),
  },
  detailWrapper: {
    flex: 1,
  },
  pb36: {
    paddingBottom: RH(36),
  },
  map: {
    height: RH(143),
    overflow: 'hidden',
    borderRadius: RW(20),
  },
  lh25: {
    lineHeight: RH(25),
  },
  bgMask: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  slider: {
    paddingLeft: RW(27),
  },
  mr16: {
    marginRight: RW(16),
  },
  mr43: {
    marginRight: RW(43),
  },
  reviewWrapper: {
    borderWidth: RW(1),
    paddingLeft: RW(17),
    borderRadius: RW(10),
    paddingRight: RW(24),
    paddingVertical: RH(23),
    borderColor: LIGHT_GRAY,
  },
  mv15: {
    marginVertical: RH(15),
  },
  mr11: {
    marginRight: RW(11),
  },
  mr7: {
    marginRight: RW(7),
  },
  centred: {
    marginRight: RW(18),
    alignItems: 'center',
  },
  opacity5: {
    opacity: 0.5,
  },
  category: {
    flex: 0,
    paddingTop: RH(10),
    paddingLeft: RW(16),
  },
  categoryTitle: {
    textAlign: 'center',
    ...font('e.regular', 12, GRAY, 14),
  },
  ml21: {
    marginLeft: RW(21),
  },
  mv8: {
    marginVertical: RH(8),
  },
  maxHeight: {
    maxHeight: RH(257),
  },
  filterRow: {
    paddingTop: RH(18),
    paddingRight: RW(14),
    alignItems: 'flex-end',
  },
  filter: {
    borderWidth: RW(1),
    borderRadius: RW(30),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: RH(5),
    borderColor: LIGHT_GRAY,
    paddingHorizontal: RW(12),
  },
  filterLabel: {
    marginRight: RW(5),
    ...font('e.regular', 14, DARK_GRAY, 16),
  },
  ph17: {
    paddingHorizontal: RW(17),
  },
  status: {
    ...shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: RW(20),
    alignItems: 'center',
    paddingVertical: RH(6),
    justifyContent: 'center',
    paddingHorizontal: RW(10),
    backgroundColor: WHITE,
  },
  label: {
    ...font('e.regular', 14, DARK_GRAY, 19),
  },
  active: {
    backgroundColor: YELLOW,
  },
  pb20: {
    paddingBottom: RH(20),
  },
  image: {
    width: RW(50),
    height: RH(50),
  },
  button: {
    width: RW(180),
  },
  inactive: {
    borderWidth: RW(1),
    borderColor: GREEN,
    backgroundColor: WHITE,
  },
  green: {
    color: GREEN,
  },
  rating: {
    fontWeight: '600',
    marginLeft: RW(9),
    ...font('e.medium', 14, GRAY, 20),
  },
  modal: {
    margin: 0,
  },
  impression: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: BLACK,
  },
  progressContainer: {
    height: RH(3),
    borderRadius: RW(3),
    backgroundColor: LIGHT_GRAY,
  },
  progress: {
    height: '100%',
    borderRadius: RW(3),
    backgroundColor: WHITE,
  },
  name: {
    marginLeft: RW(5),
    ...font('e.regular', 16, DARK_GRAY, 20),
  },
  comments: {
    bottom: 0,
    height: '60%',
    width: '100%',
    paddingTop: RH(11),
    position: 'absolute',
    paddingBottom: RH(30),
    backgroundColor: WHITE,
    paddingHorizontal: RW(27),
    borderTopLeftRadius: RW(20),
    borderTopRightRadius: RW(20),
  },
  line: {
    height: RH(4),
    width: RW(105),
    alignSelf: 'center',
    borderRadius: RW(5),
    backgroundColor: LIGHT_GRAY,
  },
  composer: {
    width: RW(314),
  },
  pt15: {
    paddingTop: RH(15),
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    textAlign: 'center',
    ...font('e.medium', 16, DARK_GRAY, 20),
  },
  icon: {
    width: RW(28),
    height: RW(28),
    tintColor: GREEN,
  },
  filterIcon: {
    width: RW(20),
    height: RW(20),
  },
  pinIcon: {
    width: RW(20),
    height: RW(20),
  },
  eventStatus: {
    marginTop: RH(5),
    fontWeight: '600',
    ...font('e.medium', 16, DARK_YELLOW),
  },
  complainLabel: {
    color: RED,
  },
  complain: {
    marginTop: RH(14),
    alignItems: 'center',
  },
})
