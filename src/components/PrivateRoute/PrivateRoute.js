import React, { useContext } from 'react';
import {Route, redirect, Outlet, Navigate} from 'react-router-dom';
import { UserContext } from '../../App';

// const PrivateRoute = ({children, ...rest}) => {
//     const [loggedInUser]  = useContext(UserContext);
//     return (
//         <Route {...rest}>
//             console.log(children, rest);
//             {loggedInUser.email ? children : redirect("/login") }
//         </Route> 
//     );
// };

const PrivateRoute = () => {
    const [loggedInUser] = useContext(UserContext);
    const auth = loggedInUser.email;
    return auth ? <Outlet/> : <Navigate to="/login"/>;
}

export default PrivateRoute;