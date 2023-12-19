import React from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SheetManager } from 'react-native-actions-sheet'
import FastImage from 'react-native-fast-image'

import { DARK_GREEN, GREEN, LIGHT_GRAY, WHITE } from '@/theme/colors'
import { selectImage, takeImage } from '@/helpers/misc'
import { BUTTON_OPACITY } from '@/constants'
import { RW } from '@/theme/utils'
import { useAuth } from '@/hooks'

import downloadIcon from '@/assets/icons/ic_download.png'
import AddIcon from '@/assets/icons/add'

const Avatar = ({
  Icon,
  onClose,
  setImage,
  count = 1,
  resizeMode,
  mediaType,
  avatarLink,
  wrapperStyle,
  size = 104,
  editable = false,
  isHistory = false,
  placeholder = true,
}) => {
  const { setPermission } = useAuth()
  const [loading, setLoading] = React.useState(false)
  const _addImages = React.useCallback(
    (imgs) => {
      setLoading(true)
      setImage?.(count === 1 ? imgs?.[0] : imgs)
    },
    [setImage, count],
  )

  React.useEffect(() => {
    setLoading(false)
  }, [avatarLink])

  const uploadFile = React.useCallback(() => {
    if (!editable && !isHistory) return
    onClose?.()
    SheetManager.show('selectMedia', {
      payload: {
        choose: () => selectImage(_addImages, mediaType, () => setPermission('Фото'), count),
        take: () => takeImage(_addImages, mediaType, () => setPermission('Камере'), count),
      },
    })
  }, [_addImages, onClose, mediaType, editable, count, isHistory, setPermission])

  const updateAvatar = React.useCallback(() => {
    if (!editable) return
    SheetManager.show('selectMedia', {
      payload: {
        choose: () => selectImage(_addImages, 'photo', () => setPermission('Фото')),
        take: () => takeImage(_addImages, 'photo', () => setPermission('Камере')),
      },
    })
  }, [editable, _addImages, setPermission])

  const renderAvatar = React.useMemo(() => {
    const circleStyle = { width: RW(size), height: RW(size), borderRadius: RW(size / 2) }

    if (!avatarLink && placeholder) {
      return (
        <TouchableOpacity
          onPress={uploadFile}
          disabled={!editable || loading}
          activeOpacity={BUTTON_OPACITY}
          style={[styles.placeholder, circleStyle, wrapperStyle]}
        >
          {loading ? (
            <ActivityIndicator size={'small'} color={GREEN} />
          ) : Icon ? (
            <Icon />
          ) : (
            <FastImage source={downloadIcon} style={styles.iconImg} />
          )}
        </TouchableOpacity>
      )
    }

    return (
      <TouchableOpacity
        disabled={!editable}
        onPress={updateAvatar}
        activeOpacity={BUTTON_OPACITY}
        style={[
          styles.placeholder,
          { position: 'relative', borderRadius: RW(size / 2), width: RW(size), height: RW(size) },
          isHistory && { overflow: 'visible' },
        ]}
      >
        <FastImage
          style={[circleStyle, wrapperStyle]}
          resizeMode={resizeMode || FastImage.resizeMode.cover}
          source={typeof avatarLink === 'string' ? { uri: avatarLink } : avatarLink}
        />
        {isHistory && (
          <TouchableOpacity style={styles.add} activeOpacity={BUTTON_OPACITY} onPress={uploadFile}>
            <AddIcon size={10} color={WHITE} />
          </TouchableOpacity>
        )}
        {editable && (
          <View style={styles.icon}>
            <FastImage source={downloadIcon} style={styles.iconImg} />
          </View>
        )}
      </TouchableOpacity>
    )
  }, [
    isHistory,
    resizeMode,
    editable,
    uploadFile,
    updateAvatar,
    loading,
    size,
    avatarLink,
    wrapperStyle,
    Icon,
    placeholder,
  ])

  return renderAvatar
}

export default Avatar

const styles = StyleSheet.create({
  placeholder: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LIGHT_GRAY,
  },
  icon: {
    zIndex: 2,
    position: 'absolute',
  },
  iconImg: {
    width: RW(32),
    height: RW(32),
    tintColor: GREEN,
  },
  add: {
    right: RW(2),
    bottom: RW(2),
    width: RW(15),
    height: RW(15),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RW(15 / 2),
    backgroundColor: DARK_GREEN,
  },
})
