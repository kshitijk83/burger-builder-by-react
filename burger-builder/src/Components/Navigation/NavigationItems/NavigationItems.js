import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigateItem';

const navigationitems = (props)=>{
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">My Burger</NavigationItem>
            <NavigationItem link="/orders" >Orders</NavigationItem>
            <NavigationItem link="/auth" >Login</NavigationItem>
        </ul>
    )
}

export default navigationitems;