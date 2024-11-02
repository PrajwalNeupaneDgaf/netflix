import React, { useEffect, useRef, useState } from "react";
import NetflixLogo from "./NetflixLogo";
import Navigation from "./Navigation";
import Searchbar from "./Searchbar";
import IdInfo from "./IdInfo";
import Notification from "./Notification";
import { Box, Button } from "@mui/material";
import { useMe } from "../Context/NetContext";

function Index() {
  const { isSecondNavVisible } = useMe();
  const [bgColor, setbgColor] = useState("transparent");
  useEffect(() => {
    const handleScroll = () => {
        const valueOfScroll = window.scrollY;

        if (!isSecondNavVisible) {
            if (valueOfScroll > 40) {
                setbgColor("grey.900");
                navRef.current.style.backdropFilter = "blur(0px)"; // Clear blur when scrolled down
            } else {
                setbgColor("transparent");
                navRef.current.style.backdropFilter = "blur(2px)";
            }
        } else {
            setbgColor("grey.900");
            navRef.current.style.backdropFilter = "blur(0px)"; // Clear blur when the second nav is visible
        }
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, [isSecondNavVisible]); // Dependency array includes isSecondNavVisible
  const navRef = useRef();
  return (
    <>
      <Box
        ref={navRef}
        sx={{
          bgcolor: bgColor,
          color: "white",
        }}
        className="flex pl-12 justify-between align-middle items-center p-3 pr-12 z-40 fixed top-0 left-0 right-0 "
      >
       <Box 
         sx={{
          flexDirection:{
            xs:'row-reverse',
            sm: "row-reverse",
            md: "row",
          
          }
         }}
       className='flex gap-12 justify-center items-center'>
       <NetflixLogo />
       <Navigation />
       </Box>

       <Box className="flex gap-2 justify-center items-center">
       <Box sx={{
        display: {
          xs: "none",
          sm: "none",
          md: "flex",
          lg:'flex'
        }
       }}>
       <Searchbar />
       </Box>
        <Notification />
        <IdInfo />
       </Box>
      </Box>
    </>
  );
}

export default Index;
