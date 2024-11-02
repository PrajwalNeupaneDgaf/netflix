import React, { createContext, useContext, useState } from 'react'

const context = createContext()

const NetContext = ({children}) => {
    const [isSecondNavVisible, setisSecondNavVisible] = useState(false)
    const imageBaseURL = 'https://image.tmdb.org/t/p/original';

  return (
   <context.Provider value={
    {isSecondNavVisible, setisSecondNavVisible,imageBaseURL}
   }>
    {children}
   </context.Provider>
  )
}

export default NetContext

export const useMe = ()=>{
    return useContext(context)
}