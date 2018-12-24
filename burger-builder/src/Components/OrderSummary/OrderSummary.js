import React from 'react';

const ordersummary = (props)=>{
    const list = Object.keys(props.ingredients)
        .map((ingKey)=>{
            return <li key={ingKey}><span style={{textTransform: "uppercase"}}>{ingKey}</span>: {props.ingredients[ingKey]}</li>
        })
    return(
        <div>
            <p>Ingredients you have selected</p>
            <ul>
                {list}
            </ul>
        </div>
    )
}

export default ordersummary;