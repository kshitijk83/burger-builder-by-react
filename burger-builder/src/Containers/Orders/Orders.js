import React, { Component } from 'react';
import Order from '../../Components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as action from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../UI/Spinner/Spinner';

class Orders extends Component{


    componentDidMount(){
        this.props.orderFetchHandler(this.props.token, this.props.userId);
    }

    render(){
        let orders = <Spinner />;
        if(!this.props.loading){
            orders = this.props.fetchedOrders.map(order=>(
                    <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price = {order.price}
                    />
                ))
        }
        return(
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        fetchedOrders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const dispatchToProps=dispatch=>{
    return {
        orderFetchHandler: (token, userId)=>dispatch(action.orderFetch(token, userId))
    }
}

export default connect(mapStateToProps, dispatchToProps)(withErrorHandler(Orders, axios));