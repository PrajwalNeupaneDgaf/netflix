import { useGSAP } from '@gsap/react';
import { Box } from '@mui/material';
import gsap from 'gsap';
import React, { useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';

function Searchbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const search = useRef();

    useGSAP(() => {
        if (!isOpen) {
            gsap.to(search.current, {
                duration: 0,
                width: 50,
                ease:'none'
            });
        } else {
            gsap.to(search.current, {
                duration: .3,
                width: 300,
                ease: "power3.out"
            });
        }
    }, [isOpen]);

    return (
        <Box
            ref={search}
            className={`flex justify-center align-middle items-center ${isOpen ? "border" : ""} border-solid border-white h-9 font-[netfllix2] transition-width duration-500 ease-in-out`}
        >
            <Box className="flex justify-center cursor-pointer align-middle items-center">
                <BiSearch
                    onClick={() => {
                       if(searchTerm){
                        window.location.href = `/search/query/${searchTerm}`
                       }else{
                        setIsOpen(!isOpen);
                       }
                    }}
                    className="w-12"
                    size={'1.5rem'}
                />
            </Box>
            {isOpen && (
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }}
                    placeholder="Search Here"
                    className="border-none bg-transparent outline-none h-full w-full"
                />
            )}
        </Box>
    );
}

export default Searchbar;
