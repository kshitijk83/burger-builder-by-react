import React from 'react';
import classes from './Modal.css';
import BackDrop from '../Backdrop/BackDrop';

const Modal = (props)=> {
    return(
        <>
            <BackDrop clicked={props.modalClosed} purchasing={props.show} />
            <div className={classes.Modal}
                style={{
                    transform: props.show?"translateY(0)": "translateY(-100vh)"
                }}
            
            >
                {props.children}
            </div>
        </>
    )
}

export default Modal;