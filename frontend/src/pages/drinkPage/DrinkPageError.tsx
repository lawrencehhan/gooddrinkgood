import React from 'react';
import './DrinkPage.css'
interface DrinkPageError {

}

export default function DrinkPageError(props: DrinkPageError) {
    const {} = props
    return (
        <div className="drinkPage-error">
            <article>
                <h2 className="drinkPage-error--header">
                    Hmmm
                </h2>
                <p className="drinkPage-error--body">
                    
                </p>
            </article>
        </div>
    )
}