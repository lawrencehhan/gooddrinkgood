import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './DrinkCard.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { Navigate } from 'react-router-dom';
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
interface DrinkCard {
    drink: Drink;
    format: string;
    handleSelection: (drink:Drink) => void;
}

export default function DrinkCard(props: DrinkCard) {
    const { drink, format, handleSelection } = props;

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
            x: 0,
            y: 15,
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
        <motion.div className={`drinkCard`}
        key={drink.drink_name}
        ref={ref}
        initial='hidden'
        animate={controls}
        variants={cardVariants}
        onClick={() => handleSelection(drink)}
        >
            <img src={drink.image_url} className="drinkCard-image" />
            <div className="drinkCard-info">
                <h2 className="drinkCard-entry drinkCard-title">
                    {drink.drink_name}
                </h2>
                <p className="drinkCard-entry">
                    {drink.category1}
                </p>
                <p className="drinkCard-entry">
                    {drink.brand}
                </p>
            </div>
        </motion.div>
        // <Card className="drinkCard" >
        //     <CardActionArea>
        //         <CardMedia
        //             component="img"
        //             height="140"
        //             image={drink.image_url}
        //             alt={drink.drink_name}
        //             title={drink.drink_name}
        //         />
        //         <CardContent>
        //             <Typography gutterBottom variant="h5" component="div">
        //                 {drink.drink_name}
        //             </Typography>
        //             <Typography variant="body2" color="text.secondary">
        //                 {drink.description_short}
        //             </Typography>
        //         </CardContent>
        //     </CardActionArea>
        // </Card>
    )
}