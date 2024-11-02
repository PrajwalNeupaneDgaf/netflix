import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Axios from '../Axios';
import { useMe } from '../Context/NetContext';
import { BiInfoCircle, BiPlay } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const TopPhoto = () => {
    const [Loading, setLoading] = useState(true);
    const { imageBaseURL } = useMe();
    const num = Math.floor(Math.random() * 11);
    const [OverView, setOverView] = useState('');
    const [data, setData] = useState({});
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const trendingData = await Axios.get('trending/movie/week');
            const movieData = await Axios.get(`/movie/${trendingData.data.results[num].id}`);
            setData(movieData);
            const words = movieData.data.overview.split(' ');
            if (words.length > 50) {
                setOverView(words.slice(0, 50).join(' ') + '...');
            } else {
                setOverView(movieData.data.overview);
            }
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    const handlePlayClick = () => {
        // Navigate to WatchMovie with the required parameters
        navigate(`/watch/movie/${data.data.id}`); // Adjust path if needed
    };

    const handleMoreInfoClick = () => {
        // Open the original TMDB path for the movie
        window.open(`https://www.themoviedb.org/movie/${data.data.id}`, '_blank'); // Open in a new tab
    };

    return (
        <>
            {Loading ? '' : (
                <Box
                    className='bg-no-repeat bg-cover bg-center relative'
                    sx={{
                        backgroundImage: `url(${imageBaseURL}${data.data.backdrop_path})`,
                        height: {
                            xs: '60vh',
                            sm: '60vh',
                            md: '80vh',
                            lg: '90vh',
                        }
                    }}
                >
                    <Box
                        className="rounded-lg p-4 flex flex-col max-w-[40rem] relative"
                        sx={{
                            position: 'absolute',
                            top: {
                                xs: '25%',
                                sm: '25%',
                                md: '35%',
                                lg: '35%',
                            },
                            left: '3%',
                        }}
                    >
                        {/* Pseudo-element for dark overlay */}
                        <Box
                            component="span"
                            sx={{
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent dark background
                                borderRadius: '8px', // Match the button's border-radius
                                zIndex: 1, // Behind the text
                            }}
                        />
                        <Typography sx={{
                            color: 'grey.400',
                            fontSize: {
                                xs: '1.4rem',
                                sm: '1.9rem',
                                md: '2.5rem',
                                lg: '2.8rem'
                            },
                            fontWeight: 'bold',
                            fontFamily: 'sans',
                            lineHeight: 1,
                            mb: 3,
                            position: 'relative',
                            zIndex: 2, // Above the overlay
                        }} className='text-white'>
                            {data.data.title}
                        </Typography>
                        <Typography sx={{
                            color: 'grey.400',
                            fontSize: {
                                xs: 12,
                                sm: 12,
                                md: 16,
                                lg: 20
                            },
                            wordSpacing: '1px',
                            fontFamily: 'sans-serif',
                            position: 'relative',
                            zIndex: 2, // Above the overlay
                        }}>
                            {OverView}
                        </Typography>
                        <Box className='flex flex-row gap-6 mt-6' zIndex={2}>
                            <Button
                                onClick={handlePlayClick} // Add onClick event
                                sx={{
                                    backgroundColor: 'grey.300',
                                    color: 'black',
                                    fontFamily: 'sans-serif',
                                    fontWeight: 'bold',
                                    fontSize: {
                                        xs: 'xs',
                                        sm: 'sm',
                                        md: 'md',
                                        lg: 'lg'
                                    }
                                }}
                            >
                                <BiPlay size={'1.9rem'} /> Play
                            </Button>
                            <Button
                                onClick={handleMoreInfoClick} // Add onClick event
                                className='font-[netflix4]'
                                sx={{
                                    backgroundColor: 'grey.800',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: {
                                        xs: 'xs',
                                        sm: 'sm',
                                        md: 'md',
                                        lg: 'lg'
                                    },
                                    padding: 1
                                }}
                            >
                                <BiInfoCircle className='mr-2' size={'1.4rem'} />
                                More Info
                            </Button>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default TopPhoto;
