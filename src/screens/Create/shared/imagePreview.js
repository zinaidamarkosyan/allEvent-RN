import React from 'react'
import { TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { SheetManager } from 'react-native-actions-sheet'

import { selectImage, takeImage } from '@/helpers/misc'
import { BUTTON_OPACITY } from '@/constants'
import AddIcon from '@/assets/icons/add'
import { RED } from '@/theme/colors'
import { useAuth } from '@/hooks'

import styles from './sharedStyles'

const ImagePreview = ({ image = null, wrapperStyle, setImages, index, err }) => {
  const { setPermission } = useAuth()
  const removeImage = React.useCallback(() => {
    setImages((prev) => {
      if (prev.length === 1) {
        return []
      }
      return [...prev.slice(0, index), ...prev.slice(index + 1)]
    })
  }, [index, setImages])

  const _addImages = React.useCallback(
    (imgs) => {
      setImages((prev) => [...prev, ...imgs])
    },
    [setImages],
  )

  const onUpload = React.useCallback(() => {
    SheetManager.show('selectMedia', {
      payload: {
        choose: () => selectImage(_addImages, 'photo', () => setPermission('Фото')),
        take: () => takeImage(_addImages, 'photo', () => setPermission('Камере')),
      },
    })
  }, [_addImages, setPermission])

  if (!image) {
    return (
      <TouchableOpacity
        onPress={onUpload}
        activeOpacity={BUTTON_OPACITY}
        style={[styles.imageWrapper, wrapperStyle]}
      >
        <AddIcon color={err ? RED : undefined} />
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity onPress={removeImage}>
      <FastImage source={{ uri: image?.uri }} style={[styles.imageWrapper, wrapperStyle]} />
    </TouchableOpacity>
  )
}

export default ImagePreview
