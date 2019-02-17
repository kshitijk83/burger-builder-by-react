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

export const purchaseHandler = (orderData, token)=>{
    return dispatch=>{
        dispatch(purchaseStart());
        Axios.post('/orders.json?auth='+token, orderData)
            .then(res=> {
                // console.log(res.data);
                dispatch(purchaseBurgerSuccess(res.data.name, orderData));
            })
            .catch(err=> {
                dispatch(purchaseBurgerFail(err));
            });
    }
}

export const purchaseInit = ()=>{
    return{
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchStart = ()=>{
    return {
        type: actionTypes.FETCH_START
    }
}

export const fetchSuccess = (orders)=>{
    return{
        type: actionTypes.FETCH_SUCCESS,
        orders: orders
    }
}

export const fetchFail= ()=>{
    return{
        type: actionTypes.FETCH_FAIL,
    }
}

export const orderFetch = (token, userId)=>{
    return dispatch=>{
        dispatch(fetchStart());
        const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        Axios.get('/orders.json'+queryParams)
            .then(res=>{
                const fetchedOrders=[];
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchSuccess(fetchedOrders));
            })
            .catch(err=>{
                dispatch(fetchFail())
            })
    }
}