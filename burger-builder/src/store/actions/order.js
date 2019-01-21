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
                dispatch(purchaseBurgerSuccess(res.data.name, orderData));
            })
            .catch(err=> {
                // this.setState({ loading:false })
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

export const orderFetch = ()=>{
    return dispatch=>{
        dispatch(fetchStart());
        Axios.get('/orders.json')
            .then(res=>{
                const fetchedOrders=[];
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                console.log(fetchedOrders);
                dispatch(fetchSuccess(fetchedOrders));
                // this.setState({ fetchedOrders: fetchedOrders, loading: false })
            })
            .catch(err=>{
                // this.setState({ loading: false })
                dispatch(fetchFail())
            })
    }
}