import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const intialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state=intialState, action)=>{
    switch(action.type){
        case actionTypes.FETCH_START:
            let obj = updateObject(state, {loading: true})
            return obj;
        case actionTypes.FETCH_SUCCESS:
            obj = updateObject(state, {
                orders: action.orders,
                loading: false
            })
            return obj;
        case actionTypes.FETCH_FAIL:
            obj = updateObject(state, {loading: false});
            return obj;
        case actionTypes.PURCHASE_INIT:
            obj = updateObject(state, {purchased: false})
            return obj;
        case actionTypes.PURCHASE_START:
            obj = updateObject(state, {loading: true})
            return obj;
        case actionTypes.BURGER_SUCCESS:
            let newOrders = updateObject(action.orderData, action.orderId);
            let updatedOrders = updateObject(state, {
                loading: false,
                orders: state.orders.concat(newOrders),
                purchased: true
            })
            return updatedOrders;
        case actionTypes.BURGER_FAIL:
            obj = updateObject(state, {loading: false})
            return obj;
        default:
            return state;
    }
}

export default reducer;