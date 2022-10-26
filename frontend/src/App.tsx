import React, {useState, useEffect, useRef } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import genericData from './assets/genericData.json';
import DrinkCard from './components/card/DrinkCard';
import Navbar from './components/navbar/Navbar';
import DarkToggle from './components/DarkToggle';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import SearchPage from './pages/searchPage/SearchPage';
import DrinkPage from './pages/drinkPage/DrinkPage';
import { isTemplateExpression, isTemplateMiddle } from 'typescript';
interface Search {
  searchText: string;
  queryFound: boolean
}
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
  const [drinkDataFiltered, setDrinkDataFiltered] = useState<Drink[]>([
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
  const [selectedDrink, setSelectedDrink] = useState<Drink>(
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
  )

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
            const normalizedData = json.map((item:Drink) => {
              return {
                ...item,
                drink_name: item.drink_name.replace(/[_./']/g,'').replace(' ', '-').toLowerCase()
              }
            })
            setDrinkDataFiltered(normalizedData)
          })
          .catch((err) => setConnected(false))
        );
    })
      .catch((err) => {
        console.log(err)
      })
    );
  }, [])

  // Check to see if Burger navbar is open
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleOpen = () => {
    setIsOpen(prevIsOpen => !prevIsOpen)
  }
  // Search mechanism for drinks
  const navigate = useNavigate()
  const [search, setSearch] = useState<Search>({
    searchText: "",
    queryFound: false,
  })


  const [formWarning, setFormWarning] = useState<boolean>(false) 
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    if (value === "Enter") {
      if (search.searchText === "") {
        setFormWarning(prevFormWarning => {
          return prevFormWarning ? prevFormWarning : !prevFormWarning
        })
        console.log("Search submitted without text.")
      } else {
        getSearch(search.searchText)
      }
    } else {
      setSearch(prevSearch => ({
        ...prevSearch,
        [name]: value
      }))
    }
  }
  const handleSubmit = (event: React.SyntheticEvent<Element, Event>) => {
    event.preventDefault()
    if (search.searchText === "") {
      setFormWarning(prevFormWarning => {
        return prevFormWarning ? prevFormWarning : !prevFormWarning
      })
      console.log("Search submitted without text.")
    } else {
      console.log("before getSearch")
      console.log(search.queryFound)
      getSearch(search.searchText)
      console.log("after getSearch")
      console.log(search.queryFound)
    }
  }
  console.log(search.queryFound)
  const getSearch = (searchText: string) => {
    const filteredData = drinkDataFiltered.filter((drink) => {
      if (drink.drink_name.includes(searchText.toLowerCase())) {
        return drink
      }
    })
    setDrinkDataFiltered(filteredData)
    console.log("filteredData length:")
    console.log(filteredData.length)
    if (filteredData.length >= 1) {
      setSearch(prevSearch => ({
        ...prevSearch,
        queryFound: true
      }))
    }
    console.log("Searhced")
    console.log(search.queryFound)
    navigate(`search-results/${searchText}`)
  }
  const resetSearch = () => {
    console.log('search reset')
    setSearch(prevSearch => ({
      searchText: "",
      queryFound: false
    }))
  }
  console.log(drinkDataFiltered)
  console.log(search)
  const handleSelection = (drink: Drink) => {
    setSelectedDrink(drink)
    navigate(`drink/${drink.drinkid}`)
  }
  return (
    <motion.div className='app'>
      <Navbar 
        isOpen={isOpen}
        handleOpen={handleOpen}
        resetSearch={resetSearch}
      />
      <Routes>
        <Route path='/' element={
            <Home 
              search={search}
              formWarning={formWarning}
              handleSearch={handleSearch}
              handleSubmit={handleSubmit}
            />
          }>
        </Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/search-results/:searchText' element={<SearchPage search={search} drinkDataFiltered={drinkDataFiltered} handleSelection={handleSelection} />}></Route>
        <Route path='/drink/:id' element={<DrinkPage drink={selectedDrink}/>}></Route>
      </Routes>
    </motion.div>
  );
};
