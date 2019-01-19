import * as actionTypes from './actionTypes';
import Axios from '../../axios-orders';

export const addIngredient = (name)=>{
    return{
        type: actionTypes.ADD_INGREDIENTS,
        ingredient: name
    }
}

export const removeIngredient = (name)=>{
    return{
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredient: name
    }
}

export const setIngredients=(ingredients)=>{
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const setIngredientsFailed=()=>{
    return{
        type:actionTypes.SET_INGREDIENTS_FAILED
    }
}

export const fetchIngredients = ()=>{
    return dispatch=>{
        Axios.get('https://my-burger-builder-fbc31.firebaseio.com/ingredients.json')
            .then(res=>{
                // this.setState({ ingredients: res.data });
                dispatch(setIngredients(res.data));
            })
            .catch(err=>{
                // this.setState({ err: true });
                dispatch(setIngredientsFailed());

            })
    }
}