import React from 'react'
import { Animated, Text, TouchableWithoutFeedback, View } from 'react-native'
import RenderHtml from 'react-native-render-html'

import { getFileFromUrl, SCREEN_WIDTH } from '@/constants'
import CheckBox from '@/components/buttons/CheckBox'
import Row from '@/components/masks/Row'
import APICalls from '@/apis/APICalls'
import { RW } from '@/theme/utils'

const polygon = require('@/assets/icons/ic_polygon.png')

import styles from './sharedStyles'

const Doc = ({ item }) => {
  const ref = React.useRef(false)
  const anim = React.useRef(new Animated.Value(0))
  const [opened, setOpened] = React.useState(false)
  const [_confirmed, setConfirmed] = React.useState(false)
  const [showCheck, setShowCheck] = React.useState(false)

  const { path, _id, confirmed } = item

  React.useEffect(() => {
    if (!ref.current) {
      setConfirmed(confirmed)
    }
  }, [confirmed])

  const showHide = React.useCallback(() => {
    Animated.spring(anim.current, {
      duration: 250,
      useNativeDriver: false,
      toValue: opened ? 0 : 1,
    }).start()
    setOpened(!opened)
    opened && setShowCheck(false)
  }, [opened])

  const confirmDoc = React.useCallback(
    (id) => {
      APICalls.acceptDoc(id).then((res) => {
        if (res.success) {
          setConfirmed(!_confirmed)
        }
      })
    },
    [_confirmed],
  )

  const doc = React.useMemo(() => {
    return (
      <RenderHtml
        contentWidth={SCREEN_WIDTH - RW(42)}
        source={{ uri: getFileFromUrl(path) }}
        onHTMLLoaded={() => setShowCheck(true)}
      />
    )
  }, [path])

  const docName = React.useMemo(() => path.split('docs/')?.[1]?.split?.('.')?.[0], [path])

  const header = React.useMemo(() => {
    return (
      <TouchableWithoutFeedback onPress={showHide}>
        <View>
          <Row justifyContent={'space-between'}>
            <Text style={styles.docTitle}>{docName}</Text>
            <Animated.Image
              source={polygon}
              style={[
                styles.polygon,
                {
                  transform: [
                    {
                      rotate: anim.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '-180deg'],
                      }),
                    },
                  ],
                },
              ]}
            />
          </Row>
        </View>
      </TouchableWithoutFeedback>
    )
  }, [docName, showHide])

  return (
    <View style={[styles.doc, styles.mt12]}>
      {header}
      {opened && (
        <>
          {doc}
          {showCheck && (
            <CheckBox
              withIcon
              label={'Я согласен'}
              isActive={_confirmed}
              labelStyle={styles.docText}
              onCheck={() => confirmDoc(_id)}
              itemStyle={{ borderRadius: 0 }}
            />
          )}
        </>
      )}
    </View>
  )
}

export default Doc
