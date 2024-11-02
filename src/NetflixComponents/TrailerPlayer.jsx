import React, { useEffect, useState } from 'react';
import Axios from '../Axios';
import { Box, Typography, Grid, Button } from '@mui/material';
import { RxCross1 } from 'react-icons/rx';
import { GiPlayButton } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function TrailerPlayer({ id, isMovie, setid, setIsVisible }) {
    const [trailerKey, setTrailerKey] = useState('');
    const [movieDetails, setMovieDetails] = useState(null); // State to hold movie or TV show details
    const navigate = useNavigate(); // Hook to navigate

    useEffect(() => {
        if (id) {
            fetchData();
            fetchMovieDetails(); // Fetch movie details
        }
    }, [id]);

    const fetchData = async () => {
        try {
            const response = await Axios.get(`${isMovie ? 'movie' : 'tv'}/${id}/videos`);
            const trailers = response.data.results;
            // Check if there are trailers available and get the first one
            if (trailers.length > 0) {
                const trailer = trailers.find(video => video.type === 'Trailer'); // Get the trailer type
                if (trailer) {
                    setTrailerKey(trailer.key);
                }
            }
        } catch (error) {
            console.error('Error fetching trailer data:', error);
        }
    };

    const fetchMovieDetails = async () => {
        try {
            const response = await Axios.get(`${isMovie ? 'movie' : 'tv'}/${id}`);
            setMovieDetails(response.data); // Set movie details
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    const handlePlayClick = () => {
        // Navigate to the play page for the movie or TV show
        navigate(`/watch/${isMovie?'movie':'tv'}/${id}`);
    };

    return (
        <Box className='mb-12'>
            {/* Close Button */}
            <Box className='w-full flex justify-end'>
                <Box onClick={() => {
                    setIsVisible(false);
                    setTrailerKey('');
                    setid(null);
                }} className="w-fit p-3 cursor-pointer">
                    <RxCross1 size={'1.6rem'} className='text-white' />
                </Box>
            </Box>

            {/* Trailer Iframe */}
            <Box className='w-full h-60 sm:h-80'>
                <iframe
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        borderRadius: '8px', // Added rounded corners
                    }}
                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`} // autoplay if desired
                    title="Trailer"
                    allowFullScreen
                />
            </Box>

            {/* Grid Layout for Play Button and Additional Details */}
            <Grid container spacing={2} sx={{ mt: 2, color: 'white' }}>
                <Grid item xs={12} md={6}>
                    {/* Play Button */}
                    <Button 
                        onClick={handlePlayClick}
                        variant="contained" // Material-UI button style
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: 'rgba(0, 0, 0, 0.8)', // Slightly darker background
                            borderRadius: '5px',
                            padding: '1rem',
                            cursor: 'pointer',
                            marginTop: 2,
                            width: '100%', // Full width button
                            height: '56px', // Increased height for the button
                            '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.2)', // Lighter on hover
                            },
                        }}
                    >
                        <GiPlayButton size={'1.5rem'} color='white' style={{ marginRight: '0.5rem' }} />
                        <Typography variant="body1" color="white">Play</Typography>
                    </Button>
                    <Box>
                        
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    {/* Additional Details (Placeholder for your content) */}
                    <Box sx={{ maxWidth: '600px' }}>
                        {movieDetails && (
                            <>
                                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                                    {isMovie ? movieDetails.title : movieDetails.name}
                                    {movieDetails.release_date && ` (${new Date(movieDetails.release_date).getFullYear()})`}
                                    {!isMovie && movieDetails.season_number && ` - Season ${movieDetails.season_number}`}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1, lineHeight: 1.5 }}>
                                    {movieDetails.overview || 'No overview available.'}
                                </Typography>
                            </>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default TrailerPlayer;
