import { PERMISSIONS, request, RESULTS } from 'react-native-permissions'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
import * as mime from 'react-native-mime-types'
import { Linking } from 'react-native'
import moment from 'moment-timezone'

import { IS_IOS, GOOGLE_API_KEY, MAX_FILE_SIZE, SERVER_ENDPOINT } from '@/constants'

export const onCatch = (cb) => {
  if (cb) {
    cb()
  } else {
    !IS_IOS ? Linking.openSettings() : Linking.openURL('app-settings:')
  }
}

export const selectImage = (setImages, mediaType, cb, limit) => {
  request(IS_IOS ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(
    (result) => {
      if ([RESULTS.GRANTED, RESULTS.LIMITED].includes(result)) {
        chooseImages(setImages, mediaType, limit)
      } else if ([RESULTS.BLOCKED, RESULTS.DENIED].includes(result)) {
        onCatch(cb)
      }
    },
    () => onCatch(cb),
  )
}

const testingMode = (message) => {
  // IS_IOS && Alert.alert('Test in real device', JSON.stringify(message, null, 2))
}

export const takeImage = (setImages, mediaType, cb, limit) => {
  request(IS_IOS ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then(
    (result) => {
      if ([RESULTS.GRANTED, RESULTS.LIMITED].includes(result)) {
        openCamera(setImages, mediaType, limit, cb)
      } else if ([RESULTS.BLOCKED, RESULTS.DENIED].includes(result)) {
        onCatch(cb)
      } else {
        testingMode(result)
      }
    },
    (error) => {
      testingMode(error)
      onCatch(cb)
    },
  )
}

const openCamera = (setImages = (imgs = []) => null, mediaType = 'photo', limit = 1, cb) => {
  launchCamera({
    mediaType,
    saveToPhotos: true,
  }).then(
    (response) => {
      if (!response.didCancel && response?.assets?.length) {
        return setImages(response.assets)
      } else {
        testingMode(response)
      }
    },
    (error) => {
      testingMode(error)
      onCatch(cb)
    },
  )
}

const chooseImages = (setImages = (imgs = []) => null, mediaType = 'photo', limit = 1) => {
  launchImageLibrary({
    mediaType,
    durationLimit: 10,
    selectionLimit: limit,
    presentationStyle: 'formSheet',
  }).then((response) => {
    if (!response.didCancel && response?.assets?.length) {
      setImages(response.assets)
    }
  }, console.error)
}

export const filteredCategories = (categories = [], events) => {
  return categories.filter((category) => {
    return events.some((el) => el?.category?._id === category?._id)
  })
}

export const checkFileSize = (files = []) => {
  return files.reduce((f1, f2) => (f1?.fileSize ?? 0) + f2.fileSize, 0) <= MAX_FILE_SIZE
}

export const createFileData = (files = []) => {
  return files.map((file) => ({
    uri: file.uri,
    name: `photo-${new Date().getTime()}`,
    type: mime.lookup(file.uri) || file.type || 'image',
  }))
}

export const filteredEvents = (events = [], id, dateFilter = {}) => {
  if (!id) {
    return events
  }
  return events.filter((event) => {
    if (event?.category?._id === id) {
      if (
        Object.keys(dateFilter).length &&
        moment(dateFilter.start).startOf('day').isSameOrBefore(moment(event.started_time)) &&
        moment(dateFilter.end).endOf('day').isSameOrAfter(moment(event.started_time))
      ) {
        return event
      } else if (!Object.keys(dateFilter).length) {
        return event
      }
    }
  })
}

export const geocoder = async ({
  longitude,
  latitude,
  keyword,
  reverse = true,
  signal = undefined,
  lang = 'ru',
}) => {
  const makeURL = () => {
    return `https://maps.googleapis.com/maps/api/geocode/json?${reverse ? 'latlng' : 'address'}=${
      reverse ? latitude + ',' + longitude : keyword
    }&key=${GOOGLE_API_KEY}&language=${lang}&region=.${lang}`
  }
  const data = await (await fetch(makeURL(), { signal })).json()
  return data?.results || []
}

/**
 *
 * @param {enum} type event, comment, impression
 * @param {string} id
 */
export const complain = async (type, id) => {
  if (!id) return
  const _url = `${SERVER_ENDPOINT}/report/${type}/${id}`
  await Linking.openURL(_url)
}

export const openTerms = async () => {
  await Linking.openURL(`${SERVER_ENDPOINT}/polzovatelskoe-soglashenie.html`)
}
