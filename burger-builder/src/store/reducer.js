import * as actionTypes from './action';

const intialState = {
    ingredients:{
        cheese: 0,
        meat: 0,
        salad: 0,
        bacon: 0
    },
    total_price: 0,
}

const reducer = (state=intialState, action)=>{
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient]+1,
                }
            }
        
        case actionTypes.REMOVE_INGREDIENTS:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient]-1,
                }
            }
    
        default:
            return state;
    }
}

export default reducer;