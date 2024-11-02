import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../Navbar/Navbar'

const NetflixLayout = ({children }) => {
  return (
   <>
   <Navbar/>
   <Box className="">
    {children}
   </Box>
   </>
  )
}

export default NetflixLayout