import React from 'react';
import NetflixLayout from '../Layout/NetflixLayout';
import { Box, Typography } from '@mui/material';

const Mylist = () => {
  return (
    <NetflixLayout>
      {/* Full-screen Background Image */}
      <Box 
        sx={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          backgroundImage: 'url("https://wallpaperaccess.com/full/1332641.jpg")', // Replace with your image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for readability
          }
        }}
      >
        <Typography variant="h4" sx={{ position: 'relative', zIndex: 1 }}>
          This feature is under development. Please wait for further updates.
        </Typography>
      </Box>
    </NetflixLayout>
  );
}

export default Mylist;
