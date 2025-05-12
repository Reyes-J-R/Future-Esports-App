import { Route, Navigate } from 'react-router-dom';
import DashBoard from '../comps/dashboard';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import LoadingScreen from '../comps/loading';

export const PrivateComp = ({Component}) => {
    // let authContext = useContext(AuthContext)
    let {user, isLoggedIn} = useContext(AuthContext);
    console.log(isLoggedIn)
    if ([null, undefined].includes(isLoggedIn)){
        return <LoadingScreen />
    }

    // let LoggedIn = true
    return (
        isLoggedIn ? <Component user={user}/> : <Navigate to="/login" />
    )
};

export const GuestComp = ({Component}) => {
    let {isLoggedIn} = useContext(AuthContext);
    return (
        isLoggedIn ? <Navigate to="/dashboard" /> : <Component />
    )
}
