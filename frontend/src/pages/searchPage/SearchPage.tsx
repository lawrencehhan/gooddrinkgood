import React from 'react';
import DrinkCard from '../../components/card/DrinkCard';
import './SearchPage.css'

interface Search {
    searchText: string;
    queryFound: boolean;
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
interface SearchPage {
    drinkDataFiltered: Drink[];
    search: Search;
    handleSelection: (drink:Drink) => void;
}

// Displays the search results as cards for a user's query
export default function SearchPage(props: SearchPage) {
    const { drinkDataFiltered, search, handleSelection } = props
    
    const drinkCardElements = drinkDataFiltered.map((drink:Drink) => {
        return (
          <DrinkCard 
            key = {drink.id}
            drink = {drink}
            format = {"wide"}
            handleSelection={handleSelection}
          />
        )
      })
    
    const FoundDrinks = () => {
        return (
            <>
                <h2 className="search-header">
                    Drinks found for <span className="search-query">"{search.searchText}"</span>
                </h2>
                <div className="search-body">
                    {drinkCardElements}
                </div>
            </>
        )
    } 

    const EmptyDrinks = () => {
        return (
            <h2 className="search-empty">
                Sorry, we weren't able to find anything on&nbsp;<span className="search-query">'{search.searchText}'</span>
            </h2>
        )
    }

    return (
        <div className="search">
            {search.queryFound ? <FoundDrinks /> : <EmptyDrinks />}
        </div>
    )
}