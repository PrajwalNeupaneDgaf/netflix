import React from 'react'
import Navbar from './Navbar/Navbar'
import './App.css'
import NetContext from './Context/NetContext'
import { Box } from '@mui/material'
import {BrowserRouter as Router ,Route,Routes } from 'react-router-dom'
import Home from './Home/Home'
import TvShows from './TvShows/TvShows'
import Movies from './Movies/Movies'
import WatchMovie from './NetflixComponents/WatchMovie'
import SearchData from './NetflixComponents/SearchData'
import Mylist from './NetflixComponents/Mylist'

function App() {
  return (
   <>
   <NetContext>
   <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="tv-shows" element={<TvShows/>} />
      <Route path="movies" element={<Movies/>} />
      <Route path="my-list" element={<Mylist/>} />
      <Route path="/watch/:path/:id" element={<WatchMovie/>} />
      <Route path="/search/query/:query" element={<SearchData/>} />

    </Routes>
   </Router>
   </NetContext>
   </>
  )
}

export default App