import React from 'react';
import './DrinkPage.css';
import { motion } from 'framer-motion';
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
interface DrinkPage {
    drink: Drink;
}

export default function DrinkPage(props: DrinkPage) {
    const { drink } = props;
    
    return (
        <motion.div className='drinkPage'>
            
        </motion.div>
    )
}