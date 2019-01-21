import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';


class checkout extends Component{

    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = null;
    //     for(let param of query.entries()){
    //         if(param[0]==='price'){
    //             price = param[1];
    //         }else{
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ ingredients: ingredients, price: price });
    // }

    checkoutCancelHandler=()=>{
        this.props.history.goBack();
    }

    checkoutContinueHandler=()=>{
        this.props.history.push('/checkout/contact-data');
    }

    render(){
        let summary = <Redirect to="/" />;

        if(this.props.ingredients){
            const purchaseRedirect = this.props.purchased?<Redirect to="/" />:null;
            summary =(
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                    checkoutCancelled={this.checkoutCancelHandler}
                    checkoutContinued={this.checkoutContinueHandler}
                    ingredients={this.props.ingredients} />
                    <Route path={this.props.match.url+'/contact-data'}
                    component={ContactData} />
                </div>
            )
        }
        return summary;
    }    
}

const mapStateToProps = state=>{
    return{
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps, null)(checkout);