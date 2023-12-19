import React from 'react'
import { Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { GRAY, LIGHT_GRAY, WHITE } from '@/theme/colors'
import TextInput from '@/components/inputs/input'
import { font, RH, RW } from '@/theme/utils'
import { geocoder } from '@/helpers/misc'
import { IS_IOS } from '@/constants'

export const useMapPlaceHelpers = (props) => {
  const isFocused = useIsFocused()
  const outerRef = React.useRef(null)
  const inputRef = React.useRef(null)
  const keyboardShow = React.useRef(null)
  const keyboardHide = React.useRef(null)
  const abortController = React.useRef(null)
  const [results, setResults] = React.useState([])
  const [scrollEnabled, setScrollStatus] = React.useState(true)
  const [selected, setSelected] = React.useState(!!props?.name || false)
  const [place_name, setPlaceName] = React.useState(props?.name || '')
  const [coords, setCoords] = React.useState({ longit: null, latit: null })

  const successCallback = React.useCallback((results) => {
    abortController.current = null
    if (results.length) {
      setResults(
        results.map((result) => ({
          name: result?.formatted_address || '',
          ...(result?.geometry?.location || {}),
        })),
      )
    }
  }, [])

  const _setPlaceName = React.useCallback((name) => {
    setPlaceName(name)
    setSelected(false)
  }, [])

  const _onSelect = React.useCallback((place) => {
    setResults([])
    setSelected(true)
    setPlaceName(place.name)
    setCoords({
      latit: place.lat,
      longit: place.lng,
    })
  }, [])

  React.useEffect(() => {
    if (Object.keys(coords).length && !Object.values(coords).includes(null)) {
      if (abortController.current) {
        abortController.current.abort()
      }
      abortController.current = new AbortController()
      setSelected(true)
      geocoder({
        latitude: coords.latit,
        longitude: coords.longit,
        signal: abortController.current.signal,
      }).then((result) => setPlaceName(result?.[0]?.formatted_address || ''), successCallback)
    }
  }, [coords, successCallback])

  React.useEffect(() => {
    if (place_name.length > 4 && !selected) {
      if (abortController.current) {
        abortController.current.abort()
      }
      abortController.current = new AbortController()
      geocoder({
        keyword: place_name,
        reverse: false,
        signal: abortController.current.signal,
      }).then(successCallback, successCallback)
    } else {
      setResults([])
    }
  }, [place_name, selected, successCallback])

  React.useEffect(() => {
    return () => {
      if (abortController.current) {
        abortController.current.abort()
      }
    }
  }, [])

  React.useEffect(() => {
    if (results.length) {
      inputRef.current?.focus?.()
      outerRef.current?.scrollToPosition?.(0, 400)
    }
  }, [results])

  React.useEffect(() => {
    if (isFocused) {
      keyboardShow.current = Keyboard.addListener('keyboardDidShow', () => {
        setScrollStatus(false)
      })
      keyboardHide.current = Keyboard.addListener('keyboardDidHide', () => {
        setScrollStatus(true)
      })
    } else {
      keyboardShow.current?.remove()
      keyboardHide.current?.remove()
    }
    return () => {
      keyboardShow.current?.remove()
      keyboardHide.current?.remove()
    }
  }, [isFocused])

  const AutoComplete = React.useMemo(
    () =>
      ({ wrapperStyle, value = '', results = [], err, scrollRef }) => {
        if (!outerRef.current) {
          outerRef.current = scrollRef?.current
        }
        const properties = {
          [IS_IOS && 'style']: { position: 'relative', zIndex: 999 },
        }
        return (
          <View {...properties}>
            <TextInput
              lines={1}
              err={err}
              value={value}
              ref={inputRef}
              onChange={_setPlaceName}
              wrapperStyle={[wrapperStyle]}
              placeholder={'Укажите точный адрес события'}
            />
            {!!results.length && (
              <View style={styles.dropdownItemWrapper}>
                <ScrollView
                  scrollEnabled
                  nestedScrollEnabled
                  keyboardShouldPersistTaps={'always'}
                  style={styles.dropdownItemContainer}
                >
                  {results.map((place, idx) => {
                    return (
                      <Text
                        numberOfLines={1}
                        key={idx.toString()}
                        ellipsizeMode={'tail'}
                        style={styles.dropdownItem}
                        onPress={() => _onSelect(place)}
                      >
                        {place.name}
                      </Text>
                    )
                  })}
                </ScrollView>
              </View>
            )}
          </View>
        )
      },
    [_onSelect, _setPlaceName],
  )

  return {
    place_name,
    coords,
    results,
    scrollEnabled,
    setCoords,
    AutoComplete,
    setPlaceName: _setPlaceName,
  }
}

const styles = StyleSheet.create({
  dropdownItemWrapper: {
    flex: 1,
    top: RH(70),
    zIndex: 999,
    width: '100%',
    maxHeight: RH(200),
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
  dropdownItem: {
    marginTop: RH(12),
    ...font('e.regular', 16, GRAY, 22),
  },
})
