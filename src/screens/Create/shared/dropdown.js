import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { BUTTON_OPACITY, IS_IOS } from '@/constants'
import PolygonIcon from '@/assets/icons/Polygon'

import styles from './sharedStyles'

const Dropdown = ({
  err,
  onSelect,
  itemStyle,
  items = [],
  labelStyle,
  otherVariant,
  setOpenModal,
  wrapperStyle,
  selectedValue,
  itemContainerStyle,
  placeholder = 'Выберите',
}) => {
  const [open, setOpen] = React.useState(false)

  const showHide = React.useCallback(() => {
    setOpen(!open)
  }, [open])

  const _onSelect = React.useCallback(
    (item) => {
      onSelect?.(item)
      showHide()
    },
    [onSelect, showHide],
  )

  const properties = {
    [IS_IOS && 'style']: { position: 'relative', zIndex: 999 },
  }
  return (
    <View {...properties}>
      <TouchableOpacity
        onPress={showHide}
        activeOpacity={BUTTON_OPACITY}
        style={[styles.dropdownWrapper, wrapperStyle, err && styles.error]}
      >
        <Text style={[styles.dropdownLabel, labelStyle]}>{selectedValue || placeholder}</Text>
        {!!items.length && <PolygonIcon />}
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdownItemWrapper}>
          <ScrollView
            nestedScrollEnabled
            style={[styles.dropdownItemContainer, itemContainerStyle]}
          >
            {items.map((item, idx) => {
              return (
                <Text
                  key={idx.toString()}
                  style={[styles.dropdownItem, itemStyle]}
                  onPress={() => _onSelect(item)}
                >
                  {item?.name}
                </Text>
              )
            })}
            {!!otherVariant && (
              <Text
                style={[styles.dropdownItem, itemStyle]}
                onPress={() => {
                  setOpen(false)
                  setOpenModal(true)
                }}
              >
                {otherVariant}
              </Text>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  )
}

export default Dropdown
