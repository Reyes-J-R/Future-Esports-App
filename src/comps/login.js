import '../css/login.css';
import Header from './header';
import Footer from './footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

const checkLogin = (e, loginfunc) => {
    loginfunc(e)
    // if (!loginfunc(e)){
    //     console.log("Some Error Occured")
    // }
    // else {
    //     console.log("Login success")
    // }
}

function Login(){
    const {login, isLoggedIn, user} = useContext(AuthContext);

    return(
    <>
    <Header/>
    <div className='login'>
        <form className='login-form'>
            <span><label htmlFor='login-email'>Email: </label>
            <input type='email' name='email' id="login-email"></input></span>
            <span><label htmlFor="login-password">password: </label>
            <input type="password" name="password" id='login-password'></input></span>
            <span className='submit'><button onClick={e =>{checkLogin(e, login)}} type='button'>Submit</button></span>
            
            
        </form>
        <p>Dont have an account? <Link className="register-link" to="/signup">sign up</Link></p>
    </div>
    <Footer/>
    </>
    )
}

export default Login;