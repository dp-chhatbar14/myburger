import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients:null,
    totalPrice:4,
    error:false
}

const INGREDIENTS_PRICE={
    salad:0.5,
    bacon:0.7,
    cheese:0.4,
    meat:1.3
}

const reducer = (state=initialState, action) => {

    switch(action.type){

        case actionTypes.ADD_INGRDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName]+1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            }

        case actionTypes.REMOVE_INGRDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName]-1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
            }

        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients:action.ingredients,
                error:false,
                totalPrice:4
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error: true
            }

        default:
            return state
    }

}

export default reducer