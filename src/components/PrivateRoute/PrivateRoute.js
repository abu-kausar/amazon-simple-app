import React, { useContext } from 'react';
import {Route, redirect, Outlet, Navigate, useLocation} from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = () => {
    const location = useLocation();
    const [loggedInUser] = useContext(UserContext);
    const auth = loggedInUser.email;
    return auth ? <Outlet/> : <Navigate to="/login" replace state={{from: location}}/>;
}

export default PrivateRoute;