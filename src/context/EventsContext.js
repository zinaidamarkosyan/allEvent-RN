import React from 'react'

import { useAuth } from '@/hooks/useAuth'
import APICalls from '@/apis/APICalls'

export const EventsContext = React.createContext({
  events: [],
  allEvents: [],
  categories: [],
  nearEvents: [],
  isLoading: false,
  getEvents: () => null,
  getFavorites: () => null,
  getCategories: () => null,
  getNearEvents: () => null,
  getLikedEvents: () => null,
  updateEventById: () => null,
  filterEvents: (category, situation) => null,
})

export const EventsProvider = (props) => {
  const { isAuthenticated } = useAuth()
  const [events, setEvents] = React.useState([])
  const [nearEvents, setNears] = React.useState([])
  const [allEvents, setAllEvents] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  const getEvents = React.useCallback(() => {
    setIsLoading(true)
    return APICalls.getEvents().then(
      (res) => {
        if (res.success) {
          setAllEvents((prev) => [...res.data.data])
          setEvents((prev) => [...res.data.data])
        }
        setIsLoading(false)
        return res
      },
      () => setIsLoading(false),
    )
  }, [setEvents])

  const getFavorites = React.useCallback(() => {
    return APICalls.getFavorites().then((res) => {
      if (res.success) {
        setEvents((prev) => [...res.data.data])
      }
    })
  }, [setEvents])

  const getLikedEvents = React.useCallback(() => {
    return APICalls.getLikedEvents().then((res) => {
      if (res.success) {
        setEvents((prev) => [...res.data.data])
      }
    })
  }, [setEvents])

  const getNearEvents = React.useCallback(
    (max_distance = 10000, latitude, longitude) => {
      setIsLoading(true)
      APICalls.nearEvents({ max_distance, latitude, longitude })
        .then((res) => {
          if (res.success) {
            setNears((prev) => [...res.data])
          }
          setIsLoading(false)
        })
        .catch(() => setIsLoading(false))
    },
    [setNears],
  )

  const updateEventById = React.useCallback(
    (id, _event = {}) => {
      const _events = events.map((event) => {
        if (event._id === id) {
          for (const key in _event) {
            event[key] = _event[key]
          }
          return event
        }
        return event
      })
      setEvents(_events)
    },
    [events],
  )

  const filterEvents = React.useCallback((category, situation) => {
    setIsLoading(true)
    APICalls.filterEvents({ category, situation })
      .then((res) => {
        if (res.success) {
          setEvents((prev) => [...res.data.data])
        }
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  const getCategories = React.useCallback(() => {
    APICalls.getEventCategories().then((res) => {
      if (res.success) {
        setCategories((prev) => [...res.data.data])
      }
    })
  }, [setCategories])

  const value = React.useMemo(
    () => ({
      allEvents,
      nearEvents,
      getFavorites,
      getNearEvents,
      getLikedEvents,
      isLoading,
      getEvents,
      filterEvents,
      getCategories,
      events,
      categories,
      updateEventById,
    }),
    [
      getEvents,
      allEvents,
      nearEvents,
      getFavorites,
      getNearEvents,
      getLikedEvents,
      getCategories,
      isLoading,
      filterEvents,
      events,
      categories,
      updateEventById,
    ],
  )

  React.useEffect(() => {
    getCategories()
  }, [isAuthenticated, getCategories])

  React.useEffect(() => {
    getEvents()
    getCategories()
  }, [getCategories, getEvents])

  return <EventsContext.Provider value={value}>{props.children}</EventsContext.Provider>
}
