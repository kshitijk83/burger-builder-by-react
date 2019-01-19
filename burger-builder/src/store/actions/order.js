import * as actionTypes from './actionTypes';
import Axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData)=>{
    return{
        type: actionTypes.BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (err)=>{
    return{
        type: actionTypes.BURGER_FAIL,
        error: err
    }
}

export const purchaseStart = ()=>{
    return{
        type: actionTypes.PURCHASE_START
    }
}

export const purchaseHandler = (orderData)=>{
    return dispatch=>{
        dispatch(purchaseStart());
        Axios.post('/orders.json', orderData)
            .then(res=> {
                // this.setState({ loading:false })
                // this.props.history.push('/');
                console.log(res.data);
                dispatch(purchaseBurgerSuccess(res.data, orderData));
            })
            .catch(err=> {
                // this.setState({ loading:false })
                dispatch(purchaseBurgerFail(err));
            });
    }
}