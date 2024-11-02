import React from 'react'
import TopPhoto from './TopPhoto'
import Contetnts from '../NetflixComponents/Contetnts'
import { Box } from '@mui/material'

const Index = () => {
  return (
    <>
    <TopPhoto/>
    <Box
    sx={{
      bg:'black',
      boxShadow:'0 -19px 30px black'
    }}
    className='bg-gray-950'>
                <Contetnts Title={'Trending Movies'} keyWord={'trending/movie/week'} />
                <Contetnts Title={'Trending TV Shows'} keyWord={'trending/tv/week'} />
                <Contetnts Title={'Top Rated Movies'} keyWord={'movie/top_rated'} />
                <Contetnts Title={'Top Rated TV Shows'} keyWord={'tv/top_rated'} />
                <Contetnts Title={'Popular Movies'} keyWord={'movie/popular'} />
                <Contetnts Title={'Popular TV Shows'} keyWord={'tv/popular'} />
                <Contetnts Title={'Now Playing Movies'} keyWord={'movie/now_playing'} />
    </Box>
    </>
  )
}

export default Index