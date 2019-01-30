import React, { Component } from 'react';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import classes from './Auth.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Auth extends Component{
    state = {
        controls: {
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
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    isRequired: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
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

    onChangeHandler(event, controlName){
        const updatedControls={
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }

        this.setState({controls: updatedControls});
    }

    authHandler = (event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
    }

    render(){
        const formElements = [];
        for(let key in this.state.controls){
            formElements.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElements.map(formElement=>(
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                shouldValidate={formElement.config.validation}
                changed={(event)=>this.onChangeHandler(event, formElement.id)}
                />
        ))
        return(
            <div className={classes.Auth}>
                <form onSubmit={this.authHandler}>
                    {form}
                    <Button btnType="Success">Login</Button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onAuth: (email, password)=>dispatch(actions.auth(email, password))
    }
}

export default connect(null, mapDispatchToProps)(Auth);