import React from 'react';
import classes from './Order.css';

const order = (props) => {

    const ingredient = [];
    for(let ingredientName in props.ingredients){
        ingredient.push({
            ing: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }
    const ingOutput = ingredient.map(ingt=>{
        return (
            <span
             key={ingt.ing}
             style={{
                 textTransform: 'capitalize',
                 display: 'inline-block',
                 margin: '0 8px',
                 border: '1px solid #ccc'
             }}
             >{ingt.ing} ({ingt.amount})</span>
        )
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingOutput}</p>
            <p>Price: <strong>Rupees {props.price}</strong></p>
        </div>
    );
}

export default order;