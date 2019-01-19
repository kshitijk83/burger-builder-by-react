import * as actionTypes from '../actions/actionTypes';

const intialState = {
    ingredients:null,
    total_price: 40,
    error: false
}

const INGREDIENTS_PRICE = {
    cheese: 40,
    meat: 100,
    salad: 20,
    bacon: 120
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
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                error: false
            }
        case actionTypes.SET_INGREDIENTS_FAILED:
            return{
                ...state,
                error: true
            }
    
        default:
            return state;
    }
}

export default reducer;