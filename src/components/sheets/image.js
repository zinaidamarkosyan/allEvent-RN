import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ActionSheet, { registerSheet, SheetManager } from 'react-native-actions-sheet'

import { font, RH, RW } from '@/theme/utils'
import { DARK_GRAY } from '@/theme/colors'

const SelectMediaSheet = (props) => {
  const { payload } = props
  const { choose, take } = payload || {}

  const _onChoose = React.useCallback(() => {
    SheetManager.hide(props.sheetId).then(() => {
      choose?.()
    })
  }, [choose, props.sheetId])

  const _onTake = React.useCallback(() => {
    SheetManager.hide(props.sheetId).then(() => {
      take?.()
    })
  }, [take, props.sheetId])

  return (
    <ActionSheet id={props.sheetId}>
      <View style={styles.wrapper}>
        <Text style={styles.title} onPress={_onChoose}>
          Загрузить из библиотеки
        </Text>
        <Text style={styles.title} onPress={_onTake}>
          Сделать снимок
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
  title: {
    marginBottom: RH(23),
    ...font('e.regular', 16, DARK_GRAY, 22),
  },
})

registerSheet('selectMedia', SelectMediaSheet)

export default SelectMediaSheet
