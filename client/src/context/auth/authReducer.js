import {
    SET_ALERT,
    REMOVE_ALERT,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    LOGOUT

   
} from '../types'; 


const authReducer = (state, action) => {
  switch(action.type){
    case USER_LOADED:
        console.log(action.payload);
        return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: action.payload
        }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            loading: false
        }

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
        localStorage.removeItem('token');
        return{
            ...state,
            token: null,
            isAuthenticated: false,
            loading: true,
            user: null,
            error: action.payload
        }
    
    case CLEAR_ERRORS:
        return {
            ...state,
            error: null
        }
    default:
        return state;
  }
}

export default authReducer