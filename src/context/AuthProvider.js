import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import API_BASE_URL from '../config'
import ErrorScreen from "../comps/errorScreen";

const AuthProvider = ({children}) => {

    const [isLoggedIn, setLoggedIn] = useState(null);
    const [user, setUser] = useState(null)
    const [error, setError] = useState(false)
    useEffect(() => {
        const getUserState = async () => {
            let token = localStorage.getItem("authToken")
            console.log(token)
            if (token === null || token === "undefined"){
                return false
            }
            try{
                const res = await axios.post(`${API_BASE_URL}/token/`,
                {
                    "token": token
                })
                if (res.status === 200){
                    console.log("yes")
                    setLoggedIn(true);
                    setUser(res.data.user);
                    return true
                }
            }catch{
                console.log("network error")
                setError(true)
            }
            
        }
        getUserState();


    }, [])
    
    const login = (e) => {
        console.log("login state is ", isLoggedIn)
        let email = e.target.form.email.value
        let password = e.target.form.password.value
        console.log(email, password)
    
        axios.post(`${API_BASE_URL}/login/`, {
            "email": email,
            "password": password
        }).then(res => {
            let token = res.data.token
            console.log(res.data.user)
            localStorage.setItem("authToken", token)
            setLoggedIn(true)
            setUser(res.data.user)
            console.log("no errors")
            return true
        }).catch(err => {
            // console.log(err);
            console.log("cant login")
            setLoggedIn(false)
            return false
        })
    }
        // setLoggedIn(true);
    

    const logout = () => {
        console.log("logging out")
        setLoggedIn(false);
        localStorage.removeItem("authToken")
    };

    const authContextValue = {
        isLoggedIn,
        user,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;