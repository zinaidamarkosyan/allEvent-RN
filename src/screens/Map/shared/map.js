import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Text,
  View,
  Platform,
  AppState,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import { requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import { useIsFocused } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'

import { IS_IOS, getFileFromUrl, BUTTON_OPACITY, ORGANIZER } from '@/constants'
import { useAuth, useEvents } from '@/hooks'
import { onCatch } from '@/helpers/misc'

import { customMapStyle } from './constants'
import styles from './sharedStyles'
import MapCallout from './callout'

import myLocation from '@/assets/icons/ic_myLocation.png'

const Map = ({ disabled = false, data = [], coords = [], onPress }) => {
  const state = useRef(null)
  const mapRef = useRef(null)
  const calloutRef = useRef(null)
  const markersRef = useRef(null)
  const isFocused = useIsFocused()
  const { getEvents } = useEvents()
  const [selectedId, setSelectedId] = useState(null)
  const [initCoords, setInitCoords] = useState({})
  const [isGranted, setIsGranted] = useState(false)
  const {
    setPermission,
    me: { roles },
  } = useAuth()

  const { name: role } = roles || {}

  const setCamera = useCallback(
    (coords = undefined, zoom = 12) => {
      if (!isGranted) return
      mapRef.current?.setCamera?.({
        center: {
          latitude: coords?.length ? coords[1] : initCoords?.latitude,
          longitude: coords?.length ? coords[0] : initCoords?.longitude,
        },
        zoom,
      })
    },
    [initCoords, isGranted],
  )

  const _getEvents = React.useCallback(() => {
    if (Object.keys(initCoords).length && !Object.values(initCoords).includes(null)) {
      getEvents(undefined, initCoords.latitude, initCoords.longitude)
    }
  }, [getEvents, initCoords])

  useEffect(() => {
    if (isFocused && !disabled) {
      _getEvents()
    }
  }, [isFocused, disabled, _getEvents])

  useEffect(() => {
    if (!isFocused) {
      state.current = false
      markersRef.current?.[selectedId]?.hideCallout?.()
    }
  }, [selectedId, isFocused])

  const checkPermission = useCallback(async () => {
    const permissions = IS_IOS
      ? parseInt(Platform.Version, 10) < 13
        ? [PERMISSIONS.IOS.LOCATION_ALWAYS]
        : [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]
      : [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]
    const statuses = await requestMultiple(permissions)
    return permissions.every((permission) => {
      if (IS_IOS) {
        return statuses[permission] === RESULTS.GRANTED
      }
      return (
        statuses[permission] === RESULTS.UNAVAILABLE ||
        statuses[permission] === RESULTS.LIMITED ||
        statuses[permission] === RESULTS.GRANTED
      )
    })
  }, [])

  useEffect(() => {
    if (!coords.length) return
    setCamera(coords, 18)
  }, [coords, setCamera])

  const onAppStateChanged = useCallback(
    (appState) => {
      if (appState === 'active') {
        checkPermission().then((_isGranted) => {
          setIsGranted(_isGranted)
        })
      }
    },
    [checkPermission],
  )

  useEffect(() => {
    onAppStateChanged('active')
    AppState.addEventListener('change', onAppStateChanged)
  }, [onAppStateChanged])

  // useEffect(() => {
  //   if (selectedId) {
  //     markersRef.current?.[selectedId]?.showCallout?.()
  //   }
  // }, [selectedId])

  const getMyLocation = useCallback(() => {
    setCamera()
  }, [setCamera])

  const onCatchCallback = useCallback(() => {
    setPermission('Местоположение')
  }, [setPermission])
  const isOrganizer = role === ORGANIZER
  if (!isGranted) {
    return (
      <SafeAreaView style={[{ flex: 1 }]}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity onPress={() => onCatch(onCatchCallback)} activeOpacity={BUTTON_OPACITY}>
            <Text style={styles.withoutLocation}>
              {'Приложению требуется разрешение на\nиспользование местоположения'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <>
      <MapView
        ref={mapRef}
        scrollEnabled
        showsScale={false}
        showsCompass={false}
        showsBuildings={true}
        zoomEnabled={!disabled}
        pitchEnabled={!disabled}
        provider={PROVIDER_GOOGLE}
        showsPointsOfInterest={false}
        showsUserLocation={!disabled}
        showsMyLocationButton={false}
        customMapStyle={customMapStyle}
        style={StyleSheet.absoluteFillObject}
        onPress={({ nativeEvent }) => {
          const { coordinate } = nativeEvent || {}
          const { latitude, longitude } = coordinate || {}
          if (latitude && longitude) {
            onPress?.({ geometry: { coordinates: [longitude, latitude] } })
          }
        }}
        onUserLocationChange={({ nativeEvent }) => {
          const { coordinate } = nativeEvent || {}
          const { latitude, longitude } = coordinate || {}
          if (!state.current) {
            state.current = true
            if (!coords.length) {
              setCamera([longitude, latitude])
            }
            setInitCoords({
              latitude: latitude,
              longitude: longitude,
            })
          }
        }}
      >
        {data.map((datum, idx) => {
          if ((datum.situation === 'passed' && !isOrganizer) || !Boolean(datum.eventStatus))
            return null
          return (
            <Marker
              key={datum._id}
              ref={(r) => {
                markersRef.current = {
                  ...markersRef.current,
                  [datum._id]: r,
                }
              }}
              onPress={(marker) => {
                const { coordinate } = marker.nativeEvent || {}
                if (!coordinate) return
                setSelectedId(datum._id)
                setCamera([coordinate.longitude, coordinate.latitude])
              }}
              onCalloutPress={(e) => {
                calloutRef.current?.[datum._id].openDetail?.()
              }}
              style={{ zIndex: idx + 1, justifyContent: 'center' }}
              image={getFileFromUrl(datum.category?.map_avatar)}
              coordinate={{ latitude: Number(datum.latit), longitude: Number(datum.longit) }}
            >
              <Callout tooltip={true}>
                <MapCallout
                  id={datum._id}
                  ref={(ref) => {
                    calloutRef.current = {
                      ...calloutRef.current,
                      [datum._id]: ref,
                    }
                  }}
                  title={datum.name}
                  address={datum.place_name}
                  createdAt={datum.started_time}
                  image={getFileFromUrl(datum.images?.[0]?.name)}
                />
              </Callout>
            </Marker>
          )
        })}
      </MapView>
      {!disabled && (
        <TouchableOpacity
          style={styles.myLocation}
          activeOpacity={BUTTON_OPACITY}
          onPress={getMyLocation}
        >
          <FastImage source={myLocation} style={styles.icon} />
        </TouchableOpacity>
      )}
    </>
  )
}

export default Map
