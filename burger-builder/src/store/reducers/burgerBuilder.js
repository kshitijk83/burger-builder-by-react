import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const intialState = {
    ingredients:null,
    total_price: 0,
    error: false,
    building: false
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
            let obje = updateObject(state, {
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient]+1
                },
                total_price: state.total_price + INGREDIENTS_PRICE[action.ingredient],
                building: true
            })
            return obje;
        
        case actionTypes.REMOVE_INGREDIENTS:
            obje = updateObject(state, {
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient]-1
                },
                total_price: state.total_price + INGREDIENTS_PRICE[action.ingredient],
                building: true
            })
            return obje;
        case actionTypes.SET_INGREDIENTS:
            obje = updateObject(state, {
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                total_price: 0,
                error: false,
                building: false
            })
            return obje;
        case actionTypes.SET_INGREDIENTS_FAILED:
            obje = updateObject(state, {error: true})
            return obje;
    
        default:
            return state;
    }
}

export default reducer;