import React, { Component } from 'react';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../Components/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../UI/Spinner/Spinner';
import Axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';


export class burgerbuilder extends Component{
    state={
        purchasable: false,
        purchasing: false,
        loading: false,
        err: false
    }

    componentDidMount(){
        this.props.fetchIngHandler();
    }

    updatePurchasable(ingredients){
        const total = Object.keys(ingredients)
            .map((ingKey)=>{
                return ingredients[ingKey];
            })
            .reduce((acc, nextValue)=>{
                return acc+nextValue;
            }, 0)
        return total>0;

    }

    purchasingHandler=()=>{
        if(this.props.isAuth){
            this.setState({purchasing: true});
        } else{
            this.props.onRedirectHandler('/checkout')
            this.props.history.push('/auth');
        }
    }

    backdropHandler=()=>{
        this.setState({purchasing: false});
    }

    continueHandler=()=>{
        
        this.props.purchaseInitHandler();
        this.props.history.push({
            pathname: '/checkout'
        });
    }

    render(){
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
                    isAuth={this.props.isAuth}
                    price={this.props.tp}
                    purchasing={this.purchasingHandler}
                    addIngredient={this.props.addIngHandler}
                    removeIngredient={this.props.removeIngHandler}
                    disabledInfo={disabledInfo}
                    purchasable={this.updatePurchasable(this.props.ings)} />
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
        ings: state.burgerBuilder.ingredients,
        tp: state.burgerBuilder.total_price,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token!==null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirect
    }
}

const dispatchStateToprops=dispatch=>{
    return{
        addIngHandler: (ingName)=>dispatch(burgerBuilderActions.addIngredient(ingName)),
        removeIngHandler: (ingName)=>dispatch(burgerBuilderActions.removeIngredient(ingName)),
        fetchIngHandler: ()=>dispatch(burgerBuilderActions.fetchIngredients()),
        purchaseInitHandler: ()=>{dispatch(burgerBuilderActions.purchaseInit())},
        onRedirectHandler: (path)=>dispatch(burgerBuilderActions.authRedirect(path))
    }
}

export default connect(mapStateToProps, dispatchStateToprops)(withErrorHandler(burgerbuilder, Axios));