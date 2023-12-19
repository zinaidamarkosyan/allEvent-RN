import { Dimensions, PixelRatio } from 'react-native'

import { IS_IOS } from '@/constants'

import {
  FONT_EXO_THIN,
  FONT_EXO_BOLD,
  FONT_EXO_BLACK,
  FONT_EXO_LIGHT,
  FONT_EXO_MEDIUM,
  FONT_EXO_REGULAR,
  FONT_EXO_SEMIBOLD,
} from './fonts'

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

export const RatioH = SCREEN_HEIGHT / 926
export const RatioW = SCREEN_WIDTH / 428

export const normalizePixel = (size) => {
  const newSize = size * RatioW

  if (IS_IOS) {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }

  if (size > 12) return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2

  return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

const getFontFamily = (fontFamily) => {
  switch (fontFamily) {
    // Roboto fonts
    case 'e.black':
      return FONT_EXO_BLACK
    case 'e.bold':
      return FONT_EXO_BOLD
    case 'e.light':
      return FONT_EXO_LIGHT
    case 'e.medium':
      return FONT_EXO_MEDIUM
    case 'e.regular':
      return FONT_EXO_REGULAR
    case 'e.thin':
      return FONT_EXO_THIN
    case 'e.semibold':
      return FONT_EXO_SEMIBOLD
  }
}
/**
 * Get font style object
 * @param {*} fontWeight: black | bold | heavy | light | medium | regular | semiBold | thin | ultraLight
 * @param {*} fontSize: number
 * @param {*} color: color constant
 * @param {*} lineHeight: number | string | undefined
 * @returns font style object
 */
export const font = (
  fontFamily,
  fontSize = undefined,
  color = undefined,
  lineHeight = undefined,
) => {
  const fontStyle = {
    fontFamily: getFontFamily(fontFamily),
  }
  if (fontSize !== undefined) {
    fontStyle.fontSize = normalizePixel(fontSize)
  }
  if (color !== undefined) {
    fontStyle.color = color
  }
  if (lineHeight !== undefined) {
    fontStyle.lineHeight = normalizePixel(lineHeight)
  }

  return fontStyle
}

export const shadow = {
  elevation: 5,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowRadius: 5,
  shadowOpacity: 0.5,
}

export const RW = (value) => RatioW * value
export const RH = (value) => RatioH * value
