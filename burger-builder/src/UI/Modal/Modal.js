import React, { Component } from 'react';
import classes from './Modal.css';
import BackDrop from '../Backdrop/BackDrop';

class Modal extends Component{

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show!==this.props.show || nextProps.loading!==this.props.loading;
    }

    render(){
        return(
            <>
                <BackDrop clicked={this.props.modalClosed} purchasing={this.props.show} />
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show?"translateY(0)": "translateY(-100vh)"
                    }}
                
                >
                    {this.props.children}
    
                </div>
            </>
        )
    }

}

export default Modal;