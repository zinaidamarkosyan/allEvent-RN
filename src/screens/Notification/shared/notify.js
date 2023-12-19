import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import moment from 'moment-timezone'

import { DARK_GRAY, DARK_YELLOW, LIGHT_GRAY, WHITE } from '@/theme/colors'
import PrimaryButton from '@/components/buttons/primary'
import { font, RH, RW } from '@/theme/utils'
import CloseIcon from '@/assets/icons/close'
import Row from '@/components/masks/Row'
import APICalls from '@/apis/APICalls'

import SupportModal from './supportModal'
import CauseModal from './causeModal'

const Notify = ({ item }) => {
  const [deleted, setDeleted] = React.useState(false)
  const [confirmed, setConfirmed] = React.useState(false)
  const [showCause, setShowCause] = React.useState(false)
  const [showSupport, setShowSupport] = React.useState(false)

  const _confirm = React.useCallback(
    (cause = undefined) => {
      setConfirmed(true)
      APICalls.setInPlace(item?._id, cause).then((res) => {})
    },
    [item],
  )

  const _deleteSingle = React.useCallback(() => {
    APICalls.deleteNotificationById(item?._id).then((res) => {
      if (res.success) {
        setDeleted(true)
      }
    })
  }, [item?._id])

  if (deleted) return null

  return (
    <>
      <View style={styles.row}>
        <Text style={[styles.title, !item?.read && styles.new]}>{item?.message}</Text>
        <View style={{ alignItems: 'flex-end' }}>
          <CloseIcon size={14} onPress={_deleteSingle} />
          <Text style={styles.date}>{moment(item?.date_time).format('HH:mm')}</Text>
        </View>
      </View>
      {confirmed && <Text style={[styles.confirmed, styles.mt11]}>Подтверждено.</Text>}
      {item.type === 'confirm_come' &&
        item?.event_situation !== 'passed' &&
        !confirmed &&
        !item?.confirmed && (
          <Row wrapperStyle={styles.mt11}>
            <PrimaryButton
              withOutOldStyles
              label={'Подтведить'}
              wrapperStyle={styles.btn}
              labelStyle={styles.label}
              onPress={() => _confirm()}
            />
            <PrimaryButton
              withOutOldStyles
              label={'Не получилось'}
              onPress={() => setShowCause(true)}
              wrapperStyle={[styles.btn, styles.inactive]}
              labelStyle={[styles.label, styles.inactiveLabel]}
            />
          </Row>
        )}
      {item.type === 'feedback' && (
        <Row>
          <PrimaryButton
            withOutOldStyles
            label={'Ответить'}
            wrapperStyle={styles.btn}
            labelStyle={styles.label}
            onPress={() => setShowSupport(true)}
          />
        </Row>
      )}
      {showCause && (
        <CauseModal onConfirm={_confirm} id={item?._id} onClose={() => setShowCause(false)} />
      )}
      {showSupport && (
        <SupportModal
          message={item?.message}
          id={item?._id}
          onClose={() => setShowSupport(false)}
        />
      )}
    </>
  )
}

export default Notify

const styles = StyleSheet.create({
  row: {
    marginTop: RH(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    maxWidth: RW(330),
    ...font('e.regular', 14, DARK_GRAY, 20),
  },
  new: {
    fontWeight: '600',
    ...font('e.medium', 15, DARK_GRAY, 20),
  },
  date: {
    marginTop: RH(12),
    ...font('e.regular', 12, LIGHT_GRAY, 16),
  },
  mt11: {
    marginTop: RH(11),
  },
  label: {
    ...font('e.regular', 14, WHITE, 24),
  },
  inactiveLabel: {
    color: DARK_YELLOW,
  },
  btn: {
    width: undefined,
    borderRadius: RW(20),
    alignItems: 'center',
    paddingVertical: RH(2),
    justifyContent: 'center',
    paddingHorizontal: RW(26),
    backgroundColor: DARK_YELLOW,
  },
  inactive: {
    marginLeft: RW(12),
    borderWidth: RW(1),
    backgroundColor: WHITE,
    borderColor: DARK_YELLOW,
  },
  confirmed: {
    fontWeight: '700',
    ...font('e.bold', 15, DARK_GRAY, 20),
  },
})
