import React from 'react';
import './Home.css';
import { motion } from 'framer-motion';
import TextField from '@mui/material/TextField';
interface Search {
    searchText: string;
    filterOp: boolean;
}
interface Home {
    darkMode: boolean;
    search: Search
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Home(props: Home) {
    const { darkMode, search, handleSearch } = props;

    const fade_variants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 1,
                ease: 'easeInOut',
            }
        },
        hide: {
            opacity: 0,
            x: -100,
            transition: {
                duration: 0.5,
                ease: 'easeInOut'
            }
        }
    }

    
    return (
        <motion.div className='home'>
            <motion.h1 className='home-title'
                initial='hidden'
                animate='visible'
                variants={fade_variants}
            >
                Your go-to place to research and review your drinks.
            </motion.h1>
            <motion.div className='home-functions'>
                <TextField 
                    className='home-functions--search'
                    label='Search'
                    variant='outlined'
                    name='searchText'
                    value={search.searchText}
                    onChange={handleSearch}
                />
            </motion.div>
        </motion.div>
    )
}