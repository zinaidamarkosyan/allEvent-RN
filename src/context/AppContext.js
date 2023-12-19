import React from 'react'

export const AppContext = React.createContext({})

export const AppProvider = (props) => {
  return <AppContext.Provider value={{}}>{props.children}</AppContext.Provider>
}
