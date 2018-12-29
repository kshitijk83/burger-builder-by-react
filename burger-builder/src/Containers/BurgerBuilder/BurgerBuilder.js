import React, { Component } from 'react';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../Components/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../UI/Spinner/Spinner';
import Axios from '../../axios-orders';


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
        ingredients:null,
        purchasable: false,
        total_price: 0,
        purchasing: false,
        loading: false,
        err: false
    }

    componentDidMount(){
        Axios.get('https://my-burger-builder-fbc31.firebaseio.com/ingredients.json')
            .then(res=>{
                this.setState({ ingredients: res.data });
            })
            .catch(err=>{
                this.setState({ err: true });
            })
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
        this.setState({ loading: true })
        const order ={
            ingredients: this.state.ingredients,
            price: this.state.total_price,
            customer: {
                name: 'kshitij Kumar',
                address: {
                    street: 'rainkha',
                    zipCode: '176031',
                    country: 'India',
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        Axios.post('/orders.json', order)
            .then(res=> {
                this.setState({ loading:false, purchasing: false })
            })
            .catch(err=> this.setState({ loading:false, purchasing:false }));
    }

    render(){

        const disabledInfo ={
            ...this.state.ingredients
        }
        for(let type in disabledInfo){
            disabledInfo[type]=disabledInfo[type]<=0;
        }
        let orderSummary = null;
        let burger = this.state.err?<p>Ingredients can't be</p>:<Spinner />;
        if(this.state.ingredients){
            burger = (
                <>
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
            orderSummary = <OrderSummary
                            price={this.state.total_price}
                            continueHandler={this.continueHandler}
                            modalClosed={this.backdropHandler}
                            ingredients={this.state.ingredients} />
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

export default withErrorHandler(burgerbuilder, Axios);