import React, { Component } from 'react';
import Button from '../../UI/Button/Button';


class Ordersummary extends Component{
    componentWillUpdate(){
        // console.log('[OrderSummary] WillUpdate');
    }
    render(){
        const list = Object.keys(this.props.ingredients)
        .map((ingKey)=>{
            return <li key={ingKey}><span style={{textTransform: "uppercase"}}>{ingKey}</span>: {this.props.ingredients[ingKey]}</li>
        })
        return(
            <div>
                <p><strong>Your Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Ingredients you have selected</p>
                <ul>
                    {list}
                </ul>
                <Button clicked={this.props.modalClosed} btnType="Danger" >Cancel</Button>
                <Button clicked={this.props.continueHandler} btnType="Success" >CONTINUE</Button>
            </div>
    ) 
    }
    
}

export default Ordersummary;