import { Dimensions, Platform, StatusBar } from 'react-native'
import { RH, RW } from '@/theme/utils'

export const APP_NAME = 'Alleven'
export const APP_DISPLAY_NAME = 'Alleven'
export const APP_LANG_KEY = '@AllevenLang'
export const APP_TOKEN_KEY = '@AllevenToken'
export const ACCEPT_LOCATION_USAGE = '@LocationUsage'
export const APP_AUTHENTICATED_STATUS = '@AllevenAuth'
export const LAST_LOCATION_PERMISSION = '@LastLocation'
export const LOGIN_WITH_BIOMETRICS = '@BiometricLogin'

export const MAPBOX_API_KEY =
  'sk.eyJ1IjoiYWxsZXZlbiIsImEiOiJjbGJwamY5Z2UwNWE1M3ZzNXp2OTc5aHc3In0.CB32fH5POUgDjvrvIKGz9w'

export const MAPBOX_PUBLIC_KEY =
  'pk.eyJ1IjoiYWxsZXZlbiIsImEiOiJjbDl5MW0wankwMGxoM3NuenJ2dDF5MTJxIn0.7OqxDyBwI6-7lSW1QFLR-g'
export const GOOGLE_API_KEY = 'AIzaSyBPDe31Cr9QeeZjeUW_pvS50vq3vQHvgjw'
export const APP_LANGUAGES = {
  RU: 'ru',
}

export const SERVER_ENDPOINT = __DEV__ ? 'https://alleven.ru' : 'https://alleven.ru'
export const DEEP_LINKING_SCHEMA = 'alleven:/'

export const IS_IOS = Platform.OS === 'ios'
export const MAP_TILE_SERVER = IS_IOS ? 'mapbox' : 'Mapbox'

export const NAV_HEADER_OPTION = {
  headerShown: false,
  gestureEnabled: false,
  gestureDirection: 'horizontal',
}

export const HORIZONTAL_DIM = RW(16)
export const TAB_BAR_HEIGHT = RH(65)
export const STATUS_BAR = IS_IOS ? RH(35) : StatusBar.currentHeight
export const NAV_HEADER = IS_IOS ? RH(60) : RH(65)
export const HEADER_HEIGHT = STATUS_BAR + NAV_HEADER + RH(5)
export const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const SCREEN_HEIGHT = Dimensions.get('window').height
export const SCREEN_WIDTH = Dimensions.get('window').width

export const REQUEST_TIMEOUT = 10000
export const PHONE_NUMBER_VALIDATOR = /^(\+7|7|8)?[489][0-9]{2}?[0-9]{3}?[0-9]{2}?[0-9]{2}$/
export const MAIL_VALIDATOR =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const ORGANIZER = 'ORGANIZER'
export const VISITOR = 'VISITOR'
export const MAX_FILE_SIZE = 50000000
export const BUTTON_OPACITY = 0.7

export const getFileFromUrl = (file = '') =>
  `${SERVER_ENDPOINT}/storage${file.startsWith('/') ? file : '/' + file}`
