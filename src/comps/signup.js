import '../css/signup.css';
import Header from './header';
import Footer from './footer';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { type } from '@testing-library/user-event/dist/type';
import {useNavigate} from 'react-router-dom';
import API_BASE_URL from '../config'
const register = (errfunc) =>{
    console.log("sending...")
    console.log(typeof(errfunc))
    let username = document.getElementById("signup-username").value
    let email = document.getElementById("signup-email").value
    let password = document.getElementById("signup-password").value
    let firstname = document.getElementById("signup-firstname").value
    let lastname = document.getElementById("signup-lastname").value
    console.log(username, email, password)
    axios.post(`${API_BASE_URL}/signup/`,
    {   
        "content-type": "application/json",
        "username": username,
        "password": password,
        "email": email,
        "first_name": firstname,
        "last_name": lastname
    }).then(res => {
        console.log(res.data);
        if (res.data.token === undefined){
            // let err = res.data.error;
            // let errmsg = "";
            // for (let i in err){
            //     console.log(i)
            //     errmsg += `${err[i][0].replace("This", i)}`
                
            // }
            errfunc([1, "Please Fill All Fields Correctly"])
            // navigation("/login")
        }
        else {
            window.location.href = "/login";
        }
    }).catch(err => 
        {
            // console.log("error");
            // errfunc([1, "Some Error Occured!"])
            // console.log(err.data)

    })
}

function Signup(){
    const [Error, setError] = useState([0, ""]);
    return(
    <>
    <Header/>
    <div className='sign'>
        <form className='sign-form'>
            {Error[0] ? <p style={{color: "red"}}>{Error[1]}</p>: ""}
            <span><label for='signup-email'>Email: </label>
            <input type='email' id="signup-email"></input></span>
            <span><label for="signup-firstname">First Name: </label>
            <input type='text' name="firstname" id='signup-firstname'></input></span>
            <span><label for="signup-lastname">Last Name: </label>
            <input type='text' name="lastname" id='signup-lastname'></input></span>
            <span><label for="signup-username">Username: </label>
            <input type='text' name="username" id='signup-username'></input></span>
            <span><label for="signup-password">Password: </label>
            <input type="password" name="password" id='signup-password'></input></span>
            <span className='submit'><button onClick={() => {register(setError)}} type='button'>Submit</button></span>
            
            
        </form>
        
        <p>Already have an account? <Link className="login-link" to="/login">login</Link></p>
        
    </div>
    <Footer/>
    </>
    )
}

export default Signup;