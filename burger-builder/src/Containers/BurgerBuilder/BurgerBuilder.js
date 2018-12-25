import React, { Component } from 'react';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../Components/OrderSummary/OrderSummary';


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
        purchasable: false,
        total_price: 0,
        purchasing: false
    }

    updatePurchasable(ingredients){
        const total = Object.keys(ingredients)
            .map((ingKey)=>{
                return ingredients[ingKey];
            })
            .reduce((acc, nextValue)=>{
                return acc+nextValue;
            }, 0)
        const purchasable = total>0;
        this.setState({purchasable: purchasable});

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
        this.updatePurchasable(updatedIngredients);
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
        this.updatePurchasable(updatedIngredients);
    }

    purchasingHandler=()=>{
        this.setState({purchasing: true});
    }

    backdropHandler=()=>{
        this.setState({purchasing: false});
    }

    continueHandler=()=>{
        alert('Thanks for purchasing');
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
                <Modal show = {this.state.purchasing} modalClosed={this.backdropHandler}>
                    <OrderSummary price={this.state.total_price} continueHandler={this.continueHandler} modalClosed={this.backdropHandler} ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                 price={this.state.total_price}
                 purchasing={this.purchasingHandler}
                 addIngredient={this.addIngredientHandler}
                 removeIngredient={this.removeIngredientHandler}
                 disabledInfo={disabledInfo}
                 purchasable={this.state.purchasable} />
            </>
        )
    }
}

export default burgerbuilder;