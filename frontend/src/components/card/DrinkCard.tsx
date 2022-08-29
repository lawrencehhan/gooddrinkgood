import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './DrinkCard.css'
import { useInView } from 'react-intersection-observer';
interface Drink {
    drinkid?: number;
    id?: string;
    category1: string;
    category2?: string;
    category3?: string;
    category4?: string;
    category5?: string;
    country?: string;
    drink_name: string;
    parent1?: string;
    parent2?: string;
    parent3?: string;
    brand: string;
    keywords?: string;
    description_long?: string;
    description_short?: string;
    image_key?: string;
    image_url?: string;
    isindie?: string;
    iscelebrity?: boolean;
  }

export default function DrinkCard(props: Drink) {
    const { drink_name, image_url, category1, brand, description_short } = props;

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
        key={drink_name}
        ref={ref}
        initial='hidden'
        animate={controls}
        variants={cardVariants}
        >
            <img src={image_url} className="drinkCard-image" />
            <h2>
                {drink_name}
            </h2>
            <p>
                {category1}
            </p>
            <p>
                {brand}
            </p>
        </motion.div>
    )
}