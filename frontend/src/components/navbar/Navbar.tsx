import React from 'react';
import { motion } from 'framer-motion';
import Burger from './Burger';
interface Navbar {
    darkMode: boolean;
    isOpen: boolean;
    handleOpen: () => void;
}

export default function Navbar(props: Navbar) {
    const { darkMode, isOpen, handleOpen } = props;
    const title_variants = {
        hidden: {
            opacity: 0,
            x: -200,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 1,
                ease: 'easeInOut',
            }
        }
    }

    return (
        <motion.div className='navbar'>
            <motion.a className='navbar-title'
                initial='hidden'
                animate='visible'
                variants={title_variants}>
                GOOD DRINK GOOD
            </motion.a>
            <Burger 
                darkMode={darkMode}
                isOpen={isOpen}
                handleOpen={handleOpen}
            />
        </motion.div>
    )
}