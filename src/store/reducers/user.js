import {
    USER_LOGGED, 
    USER_UNLOGGED,
    LOADING_USER,
    USER_LOADED
} from "../actions/actionTypes"

const initialState ={
    name: null,
    email:null,
    isLoading: false
}

export default (state = initialState, action) => {
    switch (action.type){
        case USER_LOGGED: 
            return {
                 ...state,  
                 name: action.payload.name,
                 email: action.payload.email
                }
        case USER_UNLOGGED: 
            return {
                ...state,
                name: null,
                email: null
            }
        case LOADING_USER:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return{
                ...state,
                isLoading: false
            }
        default: 
            return state
    }
}