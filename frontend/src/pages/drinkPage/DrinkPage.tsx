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
    isindie?: boolean;
    iscelebrity?: boolean;
  }
interface DrinkPage {
    drink: Drink;
}

export default function DrinkPage(props: DrinkPage) {
    const { drink } = props;
    
    const displayBadges = (!drink.isindie || drink.iscelebrity)
    const Badges = () => {
        return (
            <div className="drinkPage-badges">
                {!drink.isindie && <img className="drinkPage-badgeIndie drinkPage-badge" src={drink.image_url}></img>}
                {!drink.iscelebrity && <img className="drinkPage-badgeCeleb drinkPage-badge" src={drink.image_url}></img>}
            </div>
        )
    }

    return (
        <motion.div className='drinkPage'>
            <img src={drink.image_url} className="drinkPage-image"></img>
            <div className="drinkPage-info">
                <h2 className="drinkPage-title">
                    {drink.drink_name}
                </h2>
                {displayBadges && <Badges />}
                <p className="drinkPage-desc">
                    {drink.description_long}
                </p>
            </div>
        </motion.div>
    )
}