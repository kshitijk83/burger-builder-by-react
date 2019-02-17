import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigateItem';

const navigationitems = (props)=>{
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">My Burger</NavigationItem>
            {props.isAuthenticated?<NavigationItem link="/orders" >Orders</NavigationItem>:null}
            {!props.isAuthenticated?
                <NavigationItem link="/auth" >Authenticate</NavigationItem>:
                <NavigationItem link="/logout" >Logout</NavigationItem>}
        </ul>
    )
}

export default navigationitems;