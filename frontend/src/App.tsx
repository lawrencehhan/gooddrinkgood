import React, {useState, useEffect, useRef } from 'react';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';
import genericData from './assets/genericData.json';
import DrinkCard from './components/card/DrinkCard';
import Navbar from './components/navbar/Navbar';
import DarkToggle from './components/DarkToggle';
import Home from './pages/Home';
interface Search {
  searchText: string;
  filterOp: boolean;
}
interface Drink {
  drinkid: number;
  id: string;
  category1: string;
  category2?: string;
  category3?: string;
  category4?: string;
  category5?: string;
  country: string;
  drink_name: string;
  parent1: string;
  parent2?: string;
  parent3?: string;
  brand: string;
  keywords: string;
  description_long: string;
  description_short: string;
  image_key: string;
  image_url?: string;
  isindie: string;
  iscelebrity: boolean;
}

export default function App() {
  const [connected, setConnected] = useState<boolean>(false)
  const [drinkData, setDrinkData] = useState<Drink[]>([
    {
      drinkid: 0,
      id: "",
      category1: "",
      category2: "",
      category3: "",
      category4: "",
      category5: "",
      country: "",
      drink_name: "",
      parent1: "",
      parent2: "",
      parent3: "",
      brand: "",
      keywords: "",
      description_long: "",
      description_short: "",
      image_key: "",
      image_url: "",
      isindie: "",
      iscelebrity: false
    }
  ])

  // Drink Data Allocation
  useEffect(() => {
    fetch("/status").then(
      (response) => response.json()
      .then((json) => {
        setConnected(true)
        fetch("/drinks").then(
          (response) => response.json()
          .then((json) => {
            setDrinkData(prevData => json)
          })
          .catch((err) => setConnected(false))
        );
    })
      .catch((err) => {
        console.log(err)
      })
    );
  }, [])

  const drinkCardElements = drinkData.map((drink:Drink) => {
    return (
      <DrinkCard 
        key = {drink.id}
        drink_name = {drink.drink_name}
        image_url = {drink.image_url}
        category1 = {drink.category1}
        brand = {drink.brand}
        description_short = {drink.description_short}
      />
    )
  })

  // Dark-Mode toggle and respective state
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [darkMode, setDarkMode] = useState<boolean>(isDarkMode)
  const handleDarkToggle = (event:React.ChangeEvent) => {
    setDarkMode( prevDarkMode => !prevDarkMode )
    event.stopPropagation()
  }
  // Check to see if Burger navbar is open
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleOpen = () => {
    setIsOpen(prevIsOpen => !prevIsOpen)
  }
  // Search mechanism for drinks
  const [search, setSearch] = useState<Search>({
    searchText: "",
    filterOp: false,
  })
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    setSearch(prevSearch => ({
      ...prevSearch,
      [name]: value
    }))
  }

  return (
    <motion.div className='app'>
      <Navbar 
        darkMode={darkMode}
        isOpen={isOpen}
        handleOpen={handleOpen}
      />
      <Home 
        darkMode={darkMode}
        search={search}
        handleSearch={handleSearch}
      />
      <span>
        {search.searchText}
      </span>
      {drinkCardElements}
      <DarkToggle />
    </motion.div>
  );
};
