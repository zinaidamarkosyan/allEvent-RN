import React from 'react'

import APICalls from '@/apis/APICalls'
import { useAuth, useEvents } from '@/hooks'

export const SettingsContext = React.createContext({
  action: () => null,
  settings: {
    categories: [],
    notifications: [],
  },
})

export const SettingsProvider = (props) => {
  const { isAuthenticated } = useAuth()
  const [categories, setCategories] = React.useState([])
  const [notifications, setNotifications] = React.useState([])
  const { categories: _categories, getCategories: updateCategories } = useEvents()

  const getTypes = React.useCallback(() => {
    APICalls.getNotificationTypes().then((res) => {
      if (res.success) {
        setNotifications(
          (res.data?.data || []).map((notify) => ({
            id: notify._id,
            name: notify.name,
            confirmed: notify.confirmed,
          })),
        )
      }
    })
  }, [])

  const getCategories = React.useCallback(() => {
    APICalls.getFavoritesCategories().then((res) => {
      if (res.success) {
        const { data } = res.data
        const favorite_categories = _categories.map((category) => {
          return {
            id: category._id,
            name: category.name,
            confirmed: data.some((val) => val._id === category._id),
          }
        })
        setCategories(favorite_categories)
      }
    })
  }, [_categories])

  const action = React.useCallback(
    (id, status, key) => {
      if (!id) return
      if (key === 'notifications') {
        setNotifications((prev) => {
          prev.map((notify) => {
            if (notify.id === id) {
              notify.confirmed = !status
            }
            return notify
          })

          return [...prev]
        })
        const request = status ? APICalls.deleteNotificationType : APICalls.storeNotificationType
        request(id).then((res) => {
          // TODO
        })
      } else if (key === 'categories') {
        setCategories((prev) => {
          prev.map((category) => {
            if (category.id === id) {
              category.confirmed = !status
            }
            return category
          })

          return [...prev]
        })
        const request = status ? APICalls.deleteFavoriteCategory : APICalls.storeFavoriteCategory
        request(id).then((res) => {
          updateCategories()
        })
      }
    },
    [updateCategories],
  )

  React.useEffect(() => {
    if (isAuthenticated) {
      getTypes()
      getCategories()
    } else {
      setCategories([])
      setNotifications([])
    }
  }, [getTypes, getCategories, isAuthenticated])

  const value = React.useMemo(
    () => ({
      action,
      settings: {
        categories,
        notifications,
      },
    }),
    [action, categories, notifications],
  )

  return <SettingsContext.Provider value={value}>{props.children}</SettingsContext.Provider>
}
