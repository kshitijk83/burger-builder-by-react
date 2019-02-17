import React, { Component } from 'react';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import classes from './Auth.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import Spinner from '../../UI/Spinner/Spinner';

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
        },
        isSignup: true
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

    onChangeHandler(event, controlName, method){
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
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchSignupModeHandler=()=>{
        this.setState(prevState=>{
            return { isSignup: !prevState.isSignup };
        })
    }

    componentDidMount(){
        if(!this.props.buildingBurger&&this.props.authRedirect!=='/'){
            this.props.onRedirectPath();
        }
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

        if(this.props.loading){
            form = <Spinner />;
        }

        let authRedirect = null;
        if(this.props.isAuth){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return(
            <div className={classes.Auth}>
                {authRedirect}
                {this.props.error}
                <form onSubmit={this.authHandler}>
                    {form}
                    <Button btnType="Success">Login</Button>
                </form>
                <Button
                    clicked={this.switchSignupModeHandler}
                    btnType="Danger">Switch to {this.state.isSignup?'Signin':'Signup'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token!==null,
        authRedirectPath: state.auth.authRedirect,
        buildingBurger: state.burgerBuilder.building
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onAuth: (email, password, method)=>dispatch(actions.auth(email, password, method)),
        onRedirectPath: ()=>dispatch(actions.authRedirect('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);