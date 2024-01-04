import { LoginOutlined } from '@mui/icons-material'

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
   <button onClick={sign}>
    <LoginOutlined/>
   </button>
  )
}

export default Login