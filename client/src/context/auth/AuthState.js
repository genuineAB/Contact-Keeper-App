import React, {useReducer} from 'react';
import AuthContext from './authContext';
import axios from 'axios';
import AuthReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

import {
     REGISTER_SUCCESS,
     REGISTER_FAIL,
     USER_LOADED,
     AUTH_ERROR,
     LOGIN_SUCCESS,
     LOGIN_FAIL,
     CLEAR_ERRORS,
     LOGOUT

    
    } from '../types'; 

const AuthState = props => {
    
    const initialState = {
      token: localStorage.getItem('token'),
      isAuthenticated: null,
      loading: true,
      user: null,
      error: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //Load User
    
    const loadUser = async () => {
      // console.log(localStorage.getItem('token'));
      if(localStorage.token){
        setAuthToken(localStorage.token);
        
      }
      try {
        const res = await axios.get('/api/auth')

        dispatch({
          type: USER_LOADED,
          payload: res.data
        })
        // console.log(res.data)
      } catch (error) {
        dispatch({
          type: AUTH_ERROR
        })
      }
    }

    //Register User
    const register = async formData => {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      try {
        const res = await axios.post('/api/users', formData, config);
        localStorage.setItem('token', res.data.token);
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
        })
        loadUser();
        // console.log(loadUser);

      } catch (error) {
        dispatch({
          type: REGISTER_FAIL,
          payload: error.response.data.msg
        })
      }
    }

    //Login User
    const login = async formData => {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      try {
        const res = await axios.post('/api/auth', formData, config);
        localStorage.setItem('token', res.data.token)
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        })
        loadUser();

      } catch (error) {
        dispatch({
          type: LOGIN_FAIL,
          payload: error.response.data.msg
        })
      }
    }

    //Logout
    const logout = () => {
      localStorage.removeItem('token');
      dispatch({type: LOGOUT})
    }

    //Clear Errors
    const clearErrors = () => {
      dispatch({type: CLEAR_ERRORS});
    }
   
  return (
    <AuthContext.Provider 
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            clearErrors,
            loadUser,
            login,
            logout

        }}>
            {props.children}
    </AuthContext.Provider>
  )
} 

export default AuthState