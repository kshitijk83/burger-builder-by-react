import React from 'react';
import Button from '../../UI/Button/Button';


const ordersummary = (props)=>{
    const list = Object.keys(props.ingredients)
        .map((ingKey)=>{
            return <li key={ingKey}><span style={{textTransform: "uppercase"}}>{ingKey}</span>: {props.ingredients[ingKey]}</li>
        })
    return(
        <div>
            <p><strong>Your Price: {props.price.toFixed(2)}</strong></p>
            <p>Ingredients you have selected</p>
            <ul>
                {list}
            </ul>
            <Button clicked={props.modalClosed} btnType="Danger" >Cancel</Button>
            <Button clicked={props.continueHandler} btnType="Success" >CONTINUE</Button>
        </div>
    )
}

export default ordersummary;