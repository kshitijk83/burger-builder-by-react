import React, { Component } from 'react';
import Button from '../../../UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../UI/Spinner/Spinner';
import Input from '../../../UI/Input/Input';
import { connect } from 'react-redux';
import * as orderActions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Axios from 'axios';

class ContactData extends Component{
    state={
        orderForm: {
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    isRequired: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    isRequired: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP CODE'
                },
                value: '',
                validation: {
                    isRequired: true,
                    minLength: 2,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    isRequired: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    isRequired: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                valid: true,
            },    
        },
        formIsValid: false
    }

    orderHandler=(event)=>{
        event.preventDefault();
        const formData={};
        for(var formDataIdentifier in this.state.orderForm){
            formData[formDataIdentifier]= this.state.orderForm[formDataIdentifier].value;
        }
        // this.setState({ loading: true })
        const order ={
            ingredients: this.props.ingredients,
            price: this.props.tp,
            orderData: formData
        }
        this.props.orderHand(order);
    }

    checkValidity=(value ,rules)=>{
        let isValid = true;
        if(rules&&rules.isRequired){
            isValid = value.trim()!==''&&isValid;
        }

        if(rules&&rules.minLength){
            isValid = value.length>=rules.minLength&&isValid;
        }

        if(rules&&rules.maxLength){
            isValid = value.length<=rules.maxLength&&isValid;
        }

        return isValid;
    }

    onChangeHandler=(event, inputIdentifier)=>{
        // console.log(event.target.value);
        const formElement = {
            ...this.state.orderForm
        }

        const formElementUpdated={
            ...formElement[inputIdentifier]
        }
        
        formElementUpdated.value = event.target.value;
        formElementUpdated.valid = this.checkValidity(formElementUpdated.value, formElementUpdated.validation);
        // console.log(formElementUpdated);
        formElementUpdated.touched = true;
        formElement[inputIdentifier]=formElementUpdated;

        let formIsValid = true;
        for(let inputIdentifier in formElement){
            formIsValid = formElement[inputIdentifier].valid&&formIsValid;
        }
        // console.log(formIsValid);
        this.setState({orderForm: formElement, formIsValid: formIsValid });
        // console.log(this.state.formIsValid);
    }

    render(){

        const formElements = [];
        for(let key in this.state.orderForm){
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        

        let form = (
            <form onSubmit={this.orderHandler} >
                {formElements.map(formElement=>(
                    <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    shouldValidate={formElement.config.validation}
                    changed={(event)=>this.onChangeHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if(this.props.loading){
            form = <Spinner />;
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return{
        ingredients: state.burgerBuilder.ingredients,
        tp: state.burgerBuilder.total_price,
        loading: state.order.loading
    }
}

const dispatchToProps = dispatch=>{
    return{
        orderHand: (orderData)=>dispatch(orderActions.purchaseHandler(orderData))
    }
}

export default connect(mapStateToProps, dispatchToProps)(withErrorHandler(ContactData, Axios));