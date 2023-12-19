export const GEOLOCATION_CONFIG = {
  accuracy: {
    android: 'high',
    ios: 'bestForNavigation',
  },
  timeout: 30000,
  maximumAge: 10000,
  distanceFilter: 0,
  enableHighAccuracy: true,
  showLocationDialog: true,
  forceRequestLocation: true,
  forceLocationManager: false,
}

export const customMapStyle = [
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
]
