import React, { useState } from 'react';
import { motion } from 'framer-motion';
interface Burger {
    darkMode: boolean;
    isOpen: boolean;
    handleOpen : () => void;
}
export default function Burger(props: Burger) {
    const { darkMode, isOpen, handleOpen }  = props;

    const svgVariants = {
        hidden: {
             opacity: 0,
            x: 100,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: "easeInOut"
            }
        },
    }

    // Motion Components
    const variants = isOpen ? "openBurger" : "closedBurger"
    const burgerTop = {
        closedBurger: {
            rotate: 0,
            y: 0,
        },
        openBurger: {
            rotate: 45,
            y: 0.73
        }
    }
    const burgerCenter = {
        closedBurger: {
            opacity: 1,
        },
        openBurger: {
            opacity: 0,
        }
    }
    const burgerBottom = {
        closedBurger: {
            rotate: 0,
            y: 0,
        },
        openBurger: {
            rotate: -45,
            y: -0.73
        }
    }
    const transition = {
        type: "spring",
        stiffness: 260,
        damping: 20,
    }
    // Burger Line Props
    const burgerProps = {
        stroke: darkMode ? 'black' : "white",
        strokeWidth: 2,
        vectorEffect: "non-scaling-stroke",
        initial: "closed",
        animate: variants,
        transition,
    }
    const width = 24
    const height = 48
    const unitHeight = 6
    const unitWidth = (unitHeight * (width as number)) / (height as number);

    return (
        <motion.svg
            onClick={() => handleOpen()}
            viewBox={`0 0 ${unitWidth} ${unitHeight}`}
            overflow="visible"
            preserveAspectRatio="none"
            width={width}
            height={height}
            variants={svgVariants} 
            className="burger-svg"
            initial="hidden"
            animate="visible"
            // exit="hide"
            key="li-svg">
                <motion.line
                    x1="0"
                    x2={unitWidth}
                    y1="2"
                    y2="2"
                    variants={burgerTop}
                    {...burgerProps}
                />
                <motion.line
                    x1="0"
                    x2={unitWidth}
                    y1="3"
                    y2="3"
                    variants={burgerCenter}
                    {...burgerProps}
                />
                <motion.line
                    x1="0"
                    x2={unitWidth}
                    y1="4"
                    y2="4"
                    variants={burgerBottom}
                    {...burgerProps}
                />
        </motion.svg>
    )
}