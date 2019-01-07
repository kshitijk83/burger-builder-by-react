import React from 'react';
import classes from './Button.css';

const button = (props)=>{
    // console.log(props.disabled);
    return(
        <button
         disabled={props.disabled}
         onClick={props.clicked}
         className={[classes.Button, classes[props.btnType]].join(' ')}>{props.children}</button>
    )
}

export default button;