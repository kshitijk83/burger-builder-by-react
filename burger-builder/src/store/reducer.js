import * as actionTypes from './action';

const intialState = {
    ingredients:{
        cheese: 0,
        meat: 0,
        salad: 0,
        bacon: 0
    },
    total_price: 40,
}

const INGREDIENTS_PRICE = {
    cheese: 40,
    meat: 100,
    salad: 20,
    bacon:120
}

const reducer = (state=intialState, action)=>{
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient]+1
                },
                total_price: state.total_price + INGREDIENTS_PRICE[action.ingredient]
            }
        
        case actionTypes.REMOVE_INGREDIENTS:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient]-1
                },
                total_price: state.total_price - INGREDIENTS_PRICE[action.ingredient]
            }
    
        default:
            return state;
    }
}

export default reducer;