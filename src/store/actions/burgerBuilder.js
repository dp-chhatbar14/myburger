import * as actionTypes from './actionTypes'
import axios from '../../axios-orders';

export const addIngredient = (name) =>{

    return{
        type:actionTypes.ADD_INGRDIENT,
        ingredientName:name
    };
};

export const removeIngredient=(name)=>{
    return{
        type:actionTypes.REMOVE_INGRDIENT,
        ingredientName:name
    };
};

export const fetchIngredientsFailed=()=>{
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const setIngredients=(ingredients)=>{
    return{
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    };
};

export const initIngredients=()=>{
    return dispatch=>{
        axios.get('/ingredients')
        .then(response=>{
            dispatch(setIngredients(response.data));
        })
        .catch(error=>{
            dispatch(fetchIngredientsFailed());
        });
    };
};