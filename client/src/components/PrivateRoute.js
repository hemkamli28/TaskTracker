import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = () => {
    const { isAuthenticated } = useContext(AuthContext);
    // const isAuthenticated  = false ;

    if (isAuthenticated ) {
        return <Outlet />
    }
    else {
        return <Navigate to={'/login'} />
    }


};

export default PrivateRoute;
