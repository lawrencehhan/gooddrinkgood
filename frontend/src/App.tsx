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
  // update later with accurate data schema
  name: string;
  type: string;
  brand: string;
}


export default function App() {
  // Drink Data Allocation
  // useEffect(() => {
  //   // for grabbing drink database in future
  // }, [])
  const drinkData = genericData.data.drinks
  const drinkCardElements = drinkData.map((drink:Drink) => {
    return (
      <DrinkCard 
        name={drink.name}
        type={drink.type}
        brand={drink.brand}
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
