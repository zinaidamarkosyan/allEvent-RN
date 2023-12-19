import React from 'react'
import { Animated, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import * as mime from 'react-native-mime-types'
import FastImage from 'react-native-fast-image'
import Modal from 'react-native-modal'
import Video from 'react-native-video'

import { getFileFromUrl, IS_IOS, SCREEN_WIDTH } from '@/constants'
import Avatar from '@/components/avatar'
import Row from '@/components/masks/Row'
import { WHITE } from '@/theme/colors'
import { RW } from '@/theme/utils'
import { useAuth } from '@/hooks'

import CloseIcon from '@/assets/icons/close'

import styles from './sharedStyles'

const TIMEOUT = 6000 // 6 sec

const ImpressionModal = ({ setImage = () => undefined, path, user, onClose = () => null }) => {
  const {
    me: { _id },
  } = useAuth()
  const anim = React.useRef(null)
  const [index, setIndex] = React.useState(0)
  const widthAnim = React.useRef(new Animated.Value(0))

  const isImage = React.useMemo(() => {
    return !!mime.lookup(getFileFromUrl(path[index])).match(/image/g)?.length
  }, [index, path])

  const source = React.useMemo(() => {
    return { uri: getFileFromUrl(path[index]), hack: Date.now() }
  }, [index, path])

  const { count, layoutWidth } = React.useMemo(() => {
    const _count = path?.length || 1
    const _width = (SCREEN_WIDTH - RW(54) - (_count - 1) * RW(5)) / _count
    return {
      count: _count,
      layoutWidth: _width,
    }
  }, [path])

  React.useEffect(() => {
    anim.current = Animated.timing(widthAnim.current, {
      duration: TIMEOUT,
      toValue: layoutWidth,
      useNativeDriver: false,
    })
  }, [layoutWidth])

  const cb = React.useCallback(() => {
    anim.current.stop()
    anim.current.reset()
    if (path.length - 1 > index) {
      setIndex(index + 1)
    } else {
      onClose?.()
    }
  }, [index, onClose, path])

  const animate = React.useCallback(() => {
    anim.current?.start(cb)
  }, [cb])

  const onEnd = React.useCallback(() => {
    if (path.length === 1) {
      return onClose?.()
    }
    cb?.()
  }, [path, onClose, cb])

  const renderItem = React.useMemo(() => {
    if (isImage) {
      return (
        <FastImage
          source={source}
          style={styles.impression}
          onLoadEnd={() => {
            animate()
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      )
    }
    return (
      <Video
        paused={false}
        controls={false}
        onError={({ error }) => {
          onClose?.()
        }}
        onLoad={() => {
          animate()
        }}
        onEnd={onEnd}
        source={source}
        resizeMode={'contain'}
        style={styles.impression}
        posterResizeMode={'cover'}
      />
    )
  }, [isImage, source, animate, onEnd, onClose])

  return (
    <Modal
      isVisible
      style={styles.modal}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      children={
        <>
          {renderItem}
          <SafeAreaView style={StyleSheet.absoluteFillObject}>
            <StatusBar barStyle={'light-content'} />
            <View style={[styles.ph27, !IS_IOS && styles.pt15]}>
              <Row justifyContent={'space-between'}>
                {[...new Array(count).fill(1)].map((_, idx) => {
                  return (
                    <View
                      key={idx.toString()}
                      style={[styles.progressContainer, { width: layoutWidth }]}
                    >
                      <Animated.View
                        style={[
                          styles.progress,
                          {
                            width:
                              index > idx
                                ? layoutWidth
                                : index === idx
                                ? widthAnim.current.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1],
                                  })
                                : 0,
                          },
                        ]}
                      />
                    </View>
                  )
                })}
              </Row>
              <Row justifyContent={'space-between'} wrapperStyle={styles.mt20}>
                <Row>
                  <Avatar
                    size={50}
                    onClose={onClose}
                    setImage={setImage}
                    mediaType={'mixed'}
                    isHistory={user?._id === _id}
                    avatarLink={getFileFromUrl(user?.avatar)}
                  />
                  <Text style={styles.name}>{`${user?.name || ''} ${user?.surname || ''}`}</Text>
                </Row>
                <CloseIcon onPress={onClose} color={WHITE} />
              </Row>
            </View>
          </SafeAreaView>
        </>
      }
    />
  )
}

export default ImpressionModal
