import React from 'react';
import NetflixLayout from '../Layout/NetflixLayout';
import { Box } from '@mui/material';
import TopPhoto from './TopPhoto';
import Contetnts from '../NetflixComponents/Contetnts'; // Keep your spelling

const TvShows = () => {
    return (
        <NetflixLayout>
            <Box>
                <TopPhoto />
                <Box
                    sx={{
                        bg: 'black',
                        boxShadow: '0 -19px 30px black'
                    }}
                    className='bg-gray-950'
                >
                    <Contetnts Title={'Trending TV Shows'} keyWord={'trending/tv/week'} />
                    <Contetnts Title={'Top Rated TV Shows'} keyWord={'tv/top_rated'} />
                    <Contetnts Title={'Popular TV Shows'} keyWord={'tv/popular'} />
                    <Contetnts Title={'On The Air TV Shows'} keyWord={'tv/on_the_air'} />
                    <Contetnts Title={'Airing Today TV Shows'} keyWord={'tv/airing_today'} />
                    <Contetnts Title={'Action TV Shows'} keyWord={'tv/popular?with_genres=28'} />
                    {/* Add more sections if needed */}
                </Box>
            </Box>
        </NetflixLayout>
    );
};

export default TvShows;
