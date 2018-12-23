import React, { Component } from 'react';
import Burger from '../../../Components/Burger/Burger';
import BuildControls from '../../../Components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICE = {
    cheese: 1,
    meat: 1,
    salad: 1,
    bacon:1
}

class burgerbuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state={};
    // }
    state={
        ingredients:{
            cheese: 0,
            meat: 0,
            salad: 0,
            bacon:0
        },
        total_price: 0
    }

    removeIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0){
            return;
        }
        const updatedCount = oldCount-1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        // console.log(type);
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.total_price;
        const newPrice = oldPrice - priceDeduction;
        this.setState({total_price: newPrice, ingredients: updatedIngredients });
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        // console.log(type);
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.total_price;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            total_price: newPrice,
            ingredients: updatedIngredients
        });
    }

    render(){

        const disabledInfo ={
            ...this.state.ingredients
        }
        for(let type in disabledInfo){
            disabledInfo[type]=disabledInfo[type]<=0;
        }
        console.log(this.state.ingredients);

        return(
            <>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                 addIngredient={this.addIngredientHandler}
                 removeIngredient={this.removeIngredientHandler}
                 disabledInfo={disabledInfo} />
            </>
        )
    }
}

export default burgerbuilder;