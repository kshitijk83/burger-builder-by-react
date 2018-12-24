import React from 'react';
import classes from './Layout.css';
const layout = (props)=>{
    return(
        <>
            <div>side drawer, backdrop, togglebar</div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </>        
    )
}

export default layout;