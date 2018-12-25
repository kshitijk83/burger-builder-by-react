import React from 'react';
import classes from './Logo.css';
import LogoImg from '../../assets/images/burger-logo.png';

const logo=(props)=>{
    return (
        <div className={classes.Logo}>
            <img src={LogoImg} alt = "myBurger" />
        </div>
    )
}

export default logo;