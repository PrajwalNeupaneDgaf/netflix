import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from '../Axios';
import NetflixLayout from '../Layout/NetflixLayout';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const WatchMovie = () => {
    const { path, id } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [trailerKey, setTrailerKey] = useState('');
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [selectedEpisode, setSelectedEpisode] = useState(1);
    const [tvId, settvId] = useState('')
    const isMovie = path === 'movie';

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isMovie) {
                    const response = await Axios.get(`movie/${id}`);
                    setMovieDetails(response.data);
                    const trailerResponse = await Axios.get(`movie/${id}/videos`);
                    const trailers = trailerResponse.data.results;
                    const trailer = trailers.find(video => video.type === 'Trailer');
                    if (trailer) setTrailerKey(trailer.key);
                } else {
                    const response = await Axios.get(`tv/${id}`);
                    const ides = await Axios.get(`tv/${id}/external_ids`)
                    settvId(ides.data.imdb_id)
                    setMovieDetails(response.data);
                    setSeasons(response.data.seasons || []);
                    const trailerResponse = await Axios.get(`tv/${id}/videos`);
                    const trailers = trailerResponse.data.results;
                    const trailer = trailers.find(video => video.type === 'Trailer');
                    if (trailer) setTrailerKey(trailer.key);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id, isMovie]);

    const handleSeasonChange = (event) => {
        setSelectedSeason(Number(event.target.value));
        setSelectedEpisode(1);
    };

    const handleEpisodeChange = (event) => {
        setSelectedEpisode(Number(event.target.value));
    };
console.log(`https://vidsrc.xyz/embed/tv?imdb=${tvId}&season=${selectedSeason}&episode=${selectedEpisode}`)
    return (
        <NetflixLayout>
            <Box sx={{ textAlign: 'center', padding: '20px', backgroundColor: '#181818', height: '100vh', color: 'white' }}>
                <Box sx={{ marginBottom: '20px', height: '80vh' }}>
                    {isMovie ? (
                        <iframe
                            style={{
                                width: '100%',
                                height: '100%',
                                border: 'none',
                                borderRadius: '8px',
                            }}
                            src={`https://vidsrc.net/embed/movie/${id}`} 
                            title="Movie Trailer"
                            allowFullScreen
                        />
                    ) : (
                        <iframe
                            style={{
                                width: '100%',
                                height: '100%',
                                border: 'none',
                                borderRadius: '8px',
                            }}
                            src={`https://vidsrc.xyz/embed/tv?imdb=${tvId}&season=${selectedSeason}&episode=${selectedEpisode}`}
                            title="TV Show Trailer"
                            allowFullScreen
                        />
                    )}
                </Box>

                {movieDetails && (
                    <Box>
                        <Typography variant="h5">{isMovie ? movieDetails.title : movieDetails.name}</Typography>
                        {!isMovie && (
                            <Box sx={{ marginTop: '10px', display: 'flex', justifyContent: 'center', mb: 4 }}>
                                <FormControl variant="outlined" sx={{ marginRight: '10px', minWidth: 120 }}>
                                    <Select
                                        labelId="season-select-label"
                                        value={selectedSeason}
                                        onChange={handleSeasonChange}
                                        sx={{
                                            backgroundColor: '#333',
                                            color: 'white',
                                            '& .MuiSelect-icon': {
                                                color: 'white',
                                            },
                                            '& .MuiInputBase-root': {
                                                backgroundColor: '#333',
                                                borderRadius: 1,
                                            },
                                        }}
                                    >
                                        {seasons.map((season) => (
                                            <MenuItem key={season.id} value={season.season_number}>
                                                Season {season.season_number}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                                    <Select
                                        labelId="episode-select-label"
                                        value={selectedEpisode}
                                        onChange={handleEpisodeChange}
                                        sx={{
                                            backgroundColor: '#333',
                                            color: 'white',
                                            '& .MuiSelect-icon': {
                                                color: 'white',
                                            },
                                            '& .MuiInputBase-root': {
                                                backgroundColor: '#333',
                                                borderRadius: 1,
                                            },
                                        }}
                                    >
                                        {Array.from({ length: seasons[selectedSeason - 1]?.episode_count || 0 }, (_, i) => (
                                            <MenuItem key={i + 1} value={i + 1}>
                                                Episode {i + 1}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        )}
                    </Box>
                )}
            </Box>
        </NetflixLayout>
    );
};

export default WatchMovie;
