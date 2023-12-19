import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ActionSheet, { registerSheet, SheetManager } from 'react-native-actions-sheet'

import { DARK_GRAY, RED } from '@/theme/colors'
import { font, RH, RW } from '@/theme/utils'
import { complain } from '@/helpers/misc'

const ComplainSheet = (props) => {
  const { payload } = props
  const { id, onView } = payload || {}

  const _onComplain = React.useCallback(() => {
    SheetManager.hide(props.sheetId).then(() => {
      complain('impression', id)
    })
  }, [id, props.sheetId])

  return (
    <ActionSheet id={props.sheetId}>
      <View style={styles.wrapper}>
        <Text style={styles.default} onPress={onView}>
          Посмотреть впечатления
        </Text>
        <Text style={styles.title} onPress={_onComplain}>
          Пожаловаться
        </Text>
      </View>
    </ActionSheet>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: RW(20),
    paddingBottom: 0,
  },
  default: {
    marginBottom: RH(23),
    ...font('e.regular', 16, DARK_GRAY, 22),
  },
  title: {
    marginBottom: RH(23),
    ...font('e.regular', 16, RED, 22),
  },
})

registerSheet('complain', ComplainSheet)

export default ComplainSheet
