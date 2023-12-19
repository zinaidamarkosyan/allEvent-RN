import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function useStorage(key, initialValue) {
  const [storedValue, setStoredValue] = React.useState(initialValue)

  const getStoredItem = React.useCallback(async () => {
    try {
      const item = await AsyncStorage.getItem(key)
      const value = item ? JSON.parse(item) : initialValue
      setStoredValue(value)
    } catch (error) {
      console.log(error)
    }
  }, [initialValue, key])

  React.useEffect(() => {
    getStoredItem()
  }, [getStoredItem])

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(value)
      AsyncStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log('useStorage error: ', error)
    }
  }

  return [storedValue, setValue, () => setValue(initialValue)]
}
