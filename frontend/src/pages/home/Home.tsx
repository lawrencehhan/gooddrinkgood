import React from 'react';
import './Home.css';
import { motion } from 'framer-motion';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
interface Search {
    searchText: string;
    filterOp?: boolean;
}
interface Home {
    search: Search;
    formWarning: boolean;
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.SyntheticEvent<Element, Event>) => void;
}

export default function Home(props: Home) {
    const { search, formWarning, handleSearch, handleSubmit } = props;

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
            <motion.form className='home-functions'
                initial='hidden'
                animate='visible'
                variants={fade_variants}
                onSubmit={handleSubmit}
            >
                <TextField 
                    className='home-functions--search'
                    label='Search'
                    variant='outlined'
                    name='searchText'
                    value={search.searchText}
                    onChange={handleSearch}
                />
                <IconButton
                    onClick={handleSubmit}
                >
                    <SearchIcon />
                </IconButton>
            </motion.form>
            {formWarning && <div className="home-warning">Please make sure to enter a search</div>}
        </motion.div>
    )
}