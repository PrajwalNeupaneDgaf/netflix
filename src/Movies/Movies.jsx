import React from 'react';
import NetflixLayout from '../Layout/NetflixLayout';
import TopPhoto from './TopPhoto';
import Contetnts from '../NetflixComponents/Contetnts'; // Keep your spelling
import { Box } from '@mui/material';

const Movies = () => {
    return (
        <NetflixLayout>
            <TopPhoto />
            <Box
                sx={{
                    bg: 'black',
                    boxShadow: '0 -19px 30px black'
                }}
                className='bg-gray-950'
            >
                <Contetnts Title={'Trending Movies'} keyWord={'trending/movie/week'} />
                <Contetnts Title={'Top Rated Movies'} keyWord={'movie/top_rated'} />
                <Contetnts Title={'Popular Movies'} keyWord={'movie/popular'} />
                <Contetnts Title={'Now Playing Movies'} keyWord={'movie/now_playing'} />
                <Contetnts Title={'Action Movies'} keyWord={'movie/popular?with_genres=28'} />
                <Contetnts Title={'Comedy Movies'} keyWord={'movie/popular?with_genres=35'} />
                {/* Add more sections if needed */}
            </Box>
        </NetflixLayout>
    );
};

export default Movies;
