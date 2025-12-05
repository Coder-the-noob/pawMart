import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Pages/Loading';
// import Loading from "../pages/Loading.jsx";



const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

// show loading spinner while checking auth status

    if(loading){
        return <Loading></Loading> }
// if user authenticated, return children
    if(user && user?.email){
        
        return children;
    }
    // else return login page
    else{
        return <Navigate state={location.pathname} to="/auth/login" replace></Navigate>
    }
    
    
    
};

export default PrivateRoute;