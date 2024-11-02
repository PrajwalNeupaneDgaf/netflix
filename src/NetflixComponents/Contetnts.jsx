import { Box, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Axios from "../Axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useMe } from "../Context/NetContext";
import { BiPlayCircle } from "react-icons/bi";
import { GrAddCircle } from "react-icons/gr";
import TrailerPlayer from "./TrailerPlayer";

const Contents = ({ keyWord, Title }) => {
  const { imageBaseURL } = useMe();
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const scrollRef = useRef();
  const [hoveredIndex, setHoveredIndex] = useState(null); 
  const [showButtons, setShowButtons] = useState(false); 
  const [isVisible, setIsVisible] = useState(false)
  const [id, setid] = useState('')
  const[isMovie ,setIsMovie]= useState()
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await Axios.get(`${keyWord}`);
      setData(res.data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const moveRight = () => {
    scrollRef.current.scrollLeft += 100;
  };

  const moveLeft = () => {
    scrollRef.current.scrollLeft -= 100;
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index); // Set the index of the hovered item
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null); // Reset the hovered index
  };

  return (
    <>
      {Loading ? (
        <div>Loading...</div>
      ) : (
       <>
        <Box
          className="bg-transparent relative text-gray-300 pt-3 pb-6"
          onMouseEnter={() => setShowButtons(true)} // Show buttons on hover
          onMouseLeave={() => setShowButtons(false)} // Hide buttons when not hovering
        >
          {showButtons && (
            <Box className="absolute top-[50%] z-20 left-6">
              <FaChevronLeft
                onClick={moveLeft}
                height={"4rem"}
                size={"1.9rem"}
                className="text-gray-300 cursor-pointer transition-all duration-400 hover:scale-125"
              />
            </Box>
          )}
          <Box
            sx={{
              userSelect: "none",
            }}
            className="font-[netflix3] text-xl text-gray-200 z-10"
          >
            {Title}
          </Box>
          <Box
            ref={scrollRef}
            sx={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
            className="flex flex-row gap-4 flex-nowrap overflow-x-scroll pt-4"
          >
            {Data.map((item, index) => (
              <Box
              onClick={()=>{
                console.log(item)
                setid(item.id)
                setIsMovie(item.media_type=="movie"?true:false)
                setIsVisible(true)
              }}
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                sx={{
                  height: "10rem",
                  width: "22rem",
                  transition: "transform 0.3s ease",
                  backgroundImage: `url(${imageBaseURL}${item.poster_path})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  position: "relative", // Make the box relative
                  zIndex: hoveredIndex === index ? 10 : 1, // Bring to front on hover
                  "&:hover": {
                    transform: "scale(1.05)", // Scale up on hover
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                  },
                }}
                className="mb-4 min-w-[22rem] flex flex-col items-center justify-center"
              >
                <Box
                  sx={{
                    display: hoveredIndex === index ? "flex" : "none",
                  }}
                  className="flex flex-row gap-5 mt-2 relative transition-all duration-500"
                >
                  <Button
                    variant="contained" // You can change this to "outlined" or "text" if you prefer
                    sx={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark background for contrast
                      color: "white", // White icon color
                      borderRadius: "50%", // Circular button
                      width: "60px", // Adjust size
                      height: "60px", // Adjust size
                      display: "flex", // Center icon and text
                      alignItems: "center",
                      justifyContent: "center",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker on hover
                      },
                      fontSize: "1.5rem", // Icon size
                      padding: 0, // Remove padding
                    }}
                  >
                    <BiPlayCircle size={"2rem"} />
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: hoveredIndex === index ? "flex" : "none",
                  }}
                  className="text-gray-300 font-[netflix4] text-lg text-center absolute bottom-3 transition-all duration-700"
                >
                  {item.title}
                </Box>
              </Box>
            ))}
          </Box>
          {showButtons && (
            <Box className="absolute top-[50%] right-3 z-20">
              <FaChevronRight
                onClick={moveRight}
                height={"4rem"}
                size={"1.9rem"}
                className="text-gray-300 cursor-pointer transition-all duration-400 hover:scale-125"
              />
            </Box>
          )}
        </Box>
        <Box sx={{
            display:isVisible?'flex':'none'
          }} className="fixed z-50 top-0 bottom-0 left-0 right-0 backdrop-blur-sm flex justify-center mt-12">
           <Box className="bg-gray-900">
           <TrailerPlayer setid = {setid} id={id} setIsVisible={setIsVisible} isMovie={isMovie}/>
           </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Contents;
