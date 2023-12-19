import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { APP_TOKEN_KEY, LOGIN_WITH_BIOMETRICS, SERVER_ENDPOINT } from '@/constants'
import { createFileData } from '@/helpers/misc'
import APICalls from '@/apis/APICalls'
import { useStorage } from '@/hooks'

export const AuthContext = React.createContext({
  me: {},
  token: null,
  permission: '',
  deviceToken: undefined,
  getMe: () => undefined,
  isAuthenticated: false,
  loggedIn: () => undefined,
  onSuccess: () => undefined,
  uploadFiles: () => undefined,
  setFCMToken: () => undefined,
  setPermission: () => undefined,
})

export const AuthProvider = ({ children, setIsVisible }) => {
  const timer = React.useRef(null)
  const [me, setMe] = React.useState({})
  const [permission, setPermission] = React.useState('')
  const [deviceToken, setFCMToken] = React.useState(null)
  const [token, setToken, unsetToken] = useStorage(APP_TOKEN_KEY, null)
  const [isAuthenticated, setAuthenticated] = React.useState(false)

  const loggedIn = React.useCallback(
    ({ token }) => {
      AsyncStorage.setItem(LOGIN_WITH_BIOMETRICS, LOGIN_WITH_BIOMETRICS)
      APICalls.authToken = token
      setToken(token)
      setAuthenticated(!!token)
      getMe()
      global.navigate?.('TabNavigator')
      global.callback?.()
      global.callback = undefined
    },
    [setAuthenticated, setToken, getMe],
  )

  const logOut = React.useCallback(() => {
    setMe({})
    unsetToken()
    global.navigate?.('Главная')
    setAuthenticated(false)
    APICalls.signOut(deviceToken).then((res) => {
      APICalls.authToken = null
    })
  }, [setAuthenticated, unsetToken, deviceToken])

  const onSuccess = React.useCallback(() => {
    APICalls.authToken = token
    setAuthenticated(true)
    getMe()
  }, [token, getMe])

  const getMe = React.useCallback(() => {
    APICalls.getMe().then(
      (res) => {
        if (res.success) {
          setMe(res.data.data)
        }
        setIsVisible(false)
      },
      () => setIsVisible(false),
    )
  }, [setIsVisible])

  const uploadFiles = React.useCallback(
    (files = []) => {
      const data = new FormData()
      createFileData(files).forEach((file) => {
        data.append('file', file)
      })
      return fetch(
        `${SERVER_ENDPOINT}/api/${files.length > 1 ? 'upload_multi_file' : 'upload_single_file'}`,
        {
          body: data,
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'multipart/form-data',
          },
        },
      )
    },
    [token],
  )

  const value = React.useMemo(
    () => ({
      me,
      token,
      getMe,
      logOut,
      loggedIn,
      onSuccess,
      uploadFiles,
      setFCMToken,
      deviceToken,
      permission,
      setPermission,
      isAuthenticated,
    }),
    [
      me,
      token,
      deviceToken,
      setFCMToken,
      getMe,
      logOut,
      loggedIn,
      onSuccess,
      permission,
      uploadFiles,
      setPermission,
      isAuthenticated,
    ],
  )

  React.useEffect(() => {
    global.signOut = logOut
  }, [logOut])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
