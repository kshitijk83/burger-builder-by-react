import React, { Component } from 'react';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../Components/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../UI/Spinner/Spinner';
import Axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/action';


const INGREDIENTS_PRICE = {
    cheese: 40,
    meat: 100,
    salad: 20,
    bacon:120
}

class burgerbuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state={};
    // }
    state={
        purchasable: false,
        purchasing: false,
        loading: false,
        err: false
    }

    componentDidMount(){
        // Axios.get('https://my-burger-builder-fbc31.firebaseio.com/ingredients.json')
        //     .then(res=>{
        //         this.setState({ ingredients: res.data });
        //     })
        //     .catch(err=>{
        //         this.setState({ err: true });
        //     })
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
        // alert('Thanks for purchasing');
        
        const query = [];
        for(let i in this.state.ingredients){
            query.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        }
        query.push(encodeURI('price')+'='+encodeURIComponent(this.state.total_price));
        const queryString = query.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: queryString
        });
    }

    render(){
        // console.log(this.props);
        const disabledInfo ={
            ...this.props.ings
        }
        for(let type in disabledInfo){
            disabledInfo[type]=disabledInfo[type]<=0;
        }
        let orderSummary = null;
        let burger = this.state.err?<p>Ingredients can't be</p>:<Spinner />;
        if(this.props.ings){
            burger = (
                <>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                    price={this.props.tp}
                    purchasing={this.purchasingHandler}
                    addIngredient={this.props.addIngHandler}
                    removeIngredient={this.props.removeIngHandler}
                    disabledInfo={disabledInfo}
                    purchasable={this.state.purchasable} />
                </>
            )
            orderSummary = <OrderSummary
                            price={this.props.tp}
                            continueHandler={this.continueHandler}
                            modalClosed={this.backdropHandler}
                            ingredients={this.props.ings} />
        }
        
        if(this.state.loading){
            orderSummary = <Spinner />
        }

        return(
            <>
                <Modal loading ={this.state.loading} show = {this.state.purchasing} modalClosed={this.backdropHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        )
    }
}

const mapStateToProps = state=>{
    return{
        ings: state.ingredients,
        tp: state.total_price
    }
}

const dispatchStateToprops=dispatch=>{
    return{
        addIngHandler: (ingName)=>dispatch({ type: actionTypes.ADD_INGREDIENTS, ingredient: ingName }),
        removeIngHandler: (ingName)=>dispatch({ type: actionTypes.REMOVE_INGREDIENTS, ingredient: ingName })
    }
}

export default connect(mapStateToProps, dispatchStateToprops)(withErrorHandler(burgerbuilder, Axios));