import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../../UI/Backdrop/BackDrop';

const sidedrawer =(props)=>{
    
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.show){
        attachedClasses=[classes.SideDrawer, classes.Open];
    }

    return(
        <>
            <Backdrop purchasing={props.show} clicked={props.closed} />
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    )
}

export default sidedrawer;