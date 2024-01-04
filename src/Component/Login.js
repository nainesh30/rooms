import { LoginOutlined } from '@mui/icons-material'
import './Login.css'
import React from 'react'
import {auth,provider} from '../db'
import {  signInWithPopup,} from "firebase/auth";
const Login = () => {
 const sign = ()=>{
    signInWithPopup(auth, provider).catch((error) => {
    console.error(error);
  });
 }   
  return (
  <div className="login"> 
   
  <div className="container" onClick={sign}>
    <h4>Login With Google</h4>
     <LoginOutlined/>
    
    </div> 

  </div>

  )
}

export default Login