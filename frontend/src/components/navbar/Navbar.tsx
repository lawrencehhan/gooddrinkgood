import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from "react-router-dom";
import Burger from './Burger';
import './Navbar.css'
interface Navbar {
    isOpen: boolean;
    handleOpen: () => void;
    resetSearch: () => void;
}

export default function Navbar(props: Navbar) {
    const { isOpen, handleOpen, resetSearch } = props;
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
        },
        hide: {
            opacity: 0,
            x: -200,
        }
    }
    const link_parent_variants = {
        hidden: {
            x: "120vw",
        },
        visible: {
            x: 0,
            transition: {
                duration: 0.3,
                when: "beforeChildren",
                staggerChildren: 0.2,
            }
        },
        hide: {
            x: "120vw",
        }

    }
    const link_child_variants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: 'easeIn'
            }
        },
        hide: {
            opacity: 0,
        }
    }

    return (
        <motion.div className={`navbar ${isOpen ? "open" : ""}`}>
            <motion.a className='navbar-title'
                initial='hidden'
                animate='visible'
                variants={title_variants}>
                <Link onClick={resetSearch} to="/">GOOD DRINK GOOD</Link>
            </motion.a>
            <Burger 
                isOpen={isOpen}
                handleOpen={handleOpen}
            />
            <AnimatePresence>
                {isOpen &&
                    <motion.ul
                        onClick={() => handleOpen()}
                        initial='hidden'
                        animate='visible'
                        exit="hide"
                        variants={link_parent_variants}
                    >
                        <motion.li
                            variants={link_child_variants}
                        >
                            <Link onClick={resetSearch} to="/">Home</Link>
                        </motion.li>
                        <motion.li
                            variants={link_child_variants}
                        >
                            <Link to="/about">About</Link>
                        </motion.li>
                        <motion.li
                            variants={link_child_variants}
                        >
                            <Link to="/contact">Contact</Link>
                        </motion.li>
                    </motion.ul>
                }
            </AnimatePresence>
        </motion.div>
    )
}