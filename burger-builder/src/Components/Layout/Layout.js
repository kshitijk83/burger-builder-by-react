import React from 'react';
import Aux from '../../Auxiliary/Aux';
import classes from './Layout.css';
const layout = (props)=>{
    return(
        <Aux>
            <div>side drawer, backdrop, togglebar</div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>        
    )
}

export default layout;