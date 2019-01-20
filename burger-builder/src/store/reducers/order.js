import * as actionTypes from '../actions/actionTypes';

const intialState = {
    orders: [],
    loading: false
}

const reducer = (state=intialState, action)=>{
    switch(action.type){
        case actionTypes.PURCHASE_START:
            return{
                ...state,
                loading: true
            };
        case actionTypes.BURGER_SUCCESS:
            const newOrders = {
                ...action.orderData,
                id: action.orderId
            };
            return{
                ...state,
                loading: false,
                orders: state.orders.concat(newOrders)
            };
        case actionTypes.BURGER_FAIL:
            return{
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

export default reducer;