import React, { Component } from 'react';
import Order from '../../Components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as action from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../UI/Spinner/Spinner';

class Orders extends Component{


    componentDidMount(){
        // axios.get('/orders.json')
        //     .then(res=>{
        //         const fetchedOrders=[];
        //         for(let key in res.data){
        //             fetchedOrders.push({
        //                 ...res.data[key],
        //                 id: key
        //             })
        //         }
        //         this.setState({ fetchedOrders: fetchedOrders, loading: false })
        //     })
        //     .catch(err=>{
        //         this.setState({ loading: false })
        //     })
        this.props.orderFetchHandler();
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
        loading: state.order.loading
    }
}

const dispatchToProps=dispatch=>{
    return {
        orderFetchHandler: ()=>dispatch(action.orderFetch())
    }
}

export default connect(mapStateToProps, dispatchToProps)(withErrorHandler(Orders, axios));