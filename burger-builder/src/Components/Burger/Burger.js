import React from 'react';
import classes from './Burger.css';
import BurgerBuilder from './BurgerIngredients/BurgerIngredients';
const burger = (props)=>{
    return (
        <div className={classes.Burger}>
            <BurgerBuilder type="bread-top" />
            <BurgerBuilder type="cheese" />
            <BurgerBuilder type="meat" />
            <BurgerBuilder type="bread-bottom" />
        </div>
    )
}

export default burger;