import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './DrinkCard.css'
import { useInView } from 'react-intersection-observer';
interface Drink {
    // update later with accurate data schema
    name: string;
    type: string;
    brand: string;
}

export default function DrinkCard(props: Drink) {
    const { name, type, brand } = props;

    const controls = useAnimation();
    const { ref, inView } = useInView();
    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])
    const cardVariants = {
        hidden: {
            opacity: 0,
            x: -10,
            y: -10,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.8,
                ease: 'easeInOut'
            }
        }
    }
    
    return (
        <motion.div className='drinkCard'
        key={name}
        ref={ref}
        initial='hidden'
        animate={controls}
        variants={cardVariants}
        >
            Generic Card
            <h2>
                {name}
            </h2>
            <p>
                {type}
            </p>
            <p>
                {brand}
            </p>
        </motion.div>
    )
}