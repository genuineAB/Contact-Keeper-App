import React, {useContext} from 'react';
import {Route, Navigate} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({component: RouteComponent, ...rest}) => {
    const authContext = useContext(AuthContext);
    const {isAuthenticated, loading} = authContext;
    return (
        <Route { ...rest } render={props => (!isAuthenticated && !loading) ? (<Navigate to='/login' />) : (
            <RouteComponent {...props} />)
        } />
        
    )
}

export default PrivateRoute