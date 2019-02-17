import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Logout from './Containers/Auth/logout/logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';


const asyncCheckout = asyncComponent(()=>{
  return import('./Containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(()=>{
  return import('./Containers/Orders/Orders');
});

const asyncAuth = asyncComponent(()=>{
  return import('./Containers/Auth/Auth');
});

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignup();
  }

  render() {

    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuth){
      routes = (
        <Switch>
          <Route path='/auth' component={asyncAuth} />
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/logout' component={Logout} />
          <Route path='/orders' component={asyncOrders} />
          <Route path='/' exact component={BurgerBuilder} />
        </Switch>
      );
    }

    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state=>{
  return{
    isAuth: state.auth.token!==null
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    onTryAutoSignup: ()=>dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));