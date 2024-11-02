import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NetflixLayout from "../Layout/NetflixLayout";
import { Box, Typography, Button, ButtonGroup } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Axios from "../Axios";

const SearchData = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [mediaType, setMediaType] = useState("movie"); // "movie" or "tv"

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await Axios.get(`search/multi?query=${query}`);
        const filteredResults = response.data.results.filter(
          (item) => item.media_type === mediaType
        );
        setResults(filteredResults);
      } catch (error) {
        console.error("Error fetching search data:", error);
      }
    };
    if (query) fetchResults();
  }, [query, mediaType]);

  return (
    <NetflixLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "45rem",
        }}
        className="bg-gray-900"
      >
        {/* Media Type Toggle Button */}
        <Box
          pl={6}
          pt={12}
          className="bg-gray-900 text-white flex"
          sx={{ mb: 4 }}
        >
          <ButtonGroup variant="contained">
            <Button
              color={mediaType === "movie" ? "grey.700" : "grey.400"}
              onClick={() => setMediaType("movie")}
              sx={{
                bgcolor: mediaType === "movie" ? "grey.700" : "grey.400",
                transition: "background-color 0.3s, transform 0.3s",
                "&:hover": {
                  bgcolor: "grey.600",
                  transform: "scale(1.05)",
                },
              }}
            >
              Movies
            </Button>
            <Button
              color={mediaType === "tv" ? "grey.700" : "grey.400"}
              onClick={() => setMediaType("tv")}
              sx={{
                bgcolor: mediaType === "tv" ? "grey.700" : "grey.400",
                transition: "background-color 0.3s, transform 0.3s",
                "&:hover": {
                  bgcolor: "grey.600",
                  transform: "scale(1.05)",
                },
              }}
            >
              TV Shows
            </Button>
          </ButtonGroup>
        </Box>

        {/* Search Results */}
        <Box
          p={4}
          className="bg-gray-900 text-white"
          sx={{ minHeight: "50vh" }}
        >
          <Typography variant="h5" gutterBottom>
            Results for "{query}" (
            {mediaType === "movie" ? "Movies" : "TV Shows"})
          </Typography>

          {results.length > 0 ? (
            <Box
              className="grid gap-4"
              sx={{
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(4, 1fr)",
                },
              }}
            >
              {results.map((item) => (
                <Box
                  key={item.id}
                  className="relative rounded-lg overflow-hidden hover:bg-gray-700 transition-all duration-300 transform hover:scale-125 hover:z-20"
                  sx={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "16px",
                    ":hover .hoverButtons": { opacity: 1 },
                  }}
                >
                  {/* Movie or TV Show Title */}
                  <Typography
                    variant="subtitle1"
                    className="font-semibold text-center text-white p-1 rounded"
                    sx={{
                      opacity: 0.9,
                      transition: "opacity 0.3s",
                      ":hover": { opacity: 1 },
                    }}
                  >
                    {item.title || item.name}
                  </Typography>

                  {/* Buttons on Hover */}
                  <Box
                    className="hoverButtons absolute top-0 left-0 w-full h-full flex items-center justify-center gap-4 bg-black bg-opacity-60 opacity-0 transition-opacity duration-300"
                    sx={{ borderRadius: "8px" }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<InfoIcon />}
                      href={`https://www.themoviedb.org/${item.media_type}/${item.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        backgroundColor: "grey.800",
                        transition: "background-color 0.3s, transform 0.3s",
                        "&:hover": {
                          bgcolor: "grey.700",
                          transform: "scale(1.05)",
                        },
                      }}
                      size="small"
                    >
                      Info
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<PlayArrowIcon />}
                      size="small"
                      sx={{
                        backgroundColor: "grey.400",
                        transition: "background-color 0.3s, transform 0.3s",
                        "&:hover": {
                          bgcolor: "grey.300",
                          transform: "scale(1.05)",
                        },
                      }}
                      href={`/watch/${mediaType}/${item.id}`}
                    >
                      Play
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography>No results found for "{query}"</Typography>
          )}
        </Box>
      </Box>
    </NetflixLayout>
  );
};

export default SearchData;
