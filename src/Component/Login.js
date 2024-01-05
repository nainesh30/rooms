import { LoginOutlined } from '@mui/icons-material'
import './Login.css'
import React from 'react'
import db, {auth,provider} from '../db'
import {  signInWithPopup,} from "firebase/auth";
import { doc, setDoc ,serverTimestamp} from 'firebase/firestore';
const Login = () => {
  // consy [user] = useAuthState(auth)
 const sign = ()=>{
    signInWithPopup(auth, provider).then((result) => {
 
console.log(result);
console.log(result);
try {
  setDoc(doc(db, "usersCollection", result.user.uid),{
        email: result.user.email,
        lastseen:serverTimestamp(),
        photoURL : result.user.photoURL
 }, { merge: true })
 } catch (error) {
  console.error(error)
 }



    }).catch((error) => {
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