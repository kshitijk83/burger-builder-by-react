import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigateItem';

const navigationitems = (props)=>{
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active>My Burger</NavigationItem>
            <NavigationItem link="/" >Checkout</NavigationItem>
        </ul>
    )
}

export default navigationitems;