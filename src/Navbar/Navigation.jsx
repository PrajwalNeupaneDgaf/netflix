import { Box, Typography, IconButton, ClickAwayListener } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu'; // Import the Menu (Hamburger) Icon
import Searchbar from './Searchbar';

function Navigation() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const Navbar = [
        { id: 1, name: "Home", url: "/" },
        { id: 2, name: "TV Shows", url: "/tv-shows" },
        { id: 3, name: "Movies", url: "/movies" },
        { id: 4, name: "My List", url: "/my-list" }
    ];

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen)
        if(isDropdownOpen){
            handleClose()
        }
    };
    const handleClose = () => setIsDropdownOpen(false);

    return (
        <Box
            className="flex gap-6 items-center relative"
            sx={{
                '@media (max-width: 768px)': {
                    display: 'flex',
                    flexDirection: 'column',
                    width:'2rem'
                }
            }}
        >
            {/* Normal Navigation for larger screens */}
            <Box className="flex gap-6 items-center" sx={{ display: { xs: 'none', md: 'flex' } }}>
                {Navbar.map((item) => (
                    <Box
                        key={item.id}
                        className={`${window.location.pathname === item.url ? 'font-[netflix3] text-sm cursor-default' : 'hover:text-gray-300 font-[netflix2] text-sm font-red-400'} transition-all duration-100`}
                        as={Link}
                        to={window.location.pathname === item.url ? '' : item.url}
                    >
                        {item.name}
                    </Box>
                ))}
            </Box>

            {/* Dropdown Menu for Small Screens */}
            <Box  sx={{ display: { xs: 'flex', md: 'none' } }} className="relative">
                <IconButton
                    onClick={handleDropdownToggle}
                    sx={{
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <MenuIcon /> {/* Hamburger Icon */}
                    <ArrowDropDownIcon />
                </IconButton>

                {isDropdownOpen && (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Box
                         width={'20rem'}
                            className="absolute mt-2 py-2 bg-black rounded shadow-lg z-10"
                            sx={{
                                opacity: 0.95,
                                top: '50px',
                                left: 12,
                                right: 0,
                                mx: 'auto',
                                borderRadius: '8px',
                                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            {Navbar.map((item) => (
                                <Box
                                    key={item.id}
                                    as={Link}
                                    to={item.url}
                                    className={`${window.location.pathname === item.url ? 'font-[netflix3] cursor-default' : 'hover:text-gray-300 font-[netflix2]'} transition-all duration-100`}
                                    sx={{
                                        color: 'white',
                                        display: 'block',
                                        padding: '12px 16px',
                                        textDecoration: 'none',
                                        ':hover': { backgroundColor: '#333' }
                                    }}
                                    onClick={handleClose} // Close dropdown on click
                                >
                                    {item.name}
                                </Box>
                            ))}
                            <Searchbar/>
                        </Box>
                    </ClickAwayListener>
                )}
            </Box>
        </Box>
    );
}

export default Navigation;
