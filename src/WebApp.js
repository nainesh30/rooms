import React from 'react'
import './App.css';
import Sidebar from './Sidebar';
import ChatRoom from './ChatRoom';
import {
  Routes,
  Route,
} from "react-router-dom"
import { BrowserRouter } from 'react-router-dom';
import Login  from './Component/Login';
import{auth} from './db'
import {useAuthState} from 'react-firebase-hooks/auth'
import { CircularProgress } from '@mui/material';
const WebApp = () => {
  const [user,loading] = useAuthState(auth)

  return (
 
        <div className="App">
      <h1>ROOMS Made by Nainesh</h1>
      {loading? <h1><CircularProgress /></h1>:
         <div className="app_body">


         {!user?(
          <Login/>
           
         ): (<BrowserRouter>
           <Sidebar/>
         <Routes>
         <Route path='rooms/:id' element = {<ChatRoom/>}/>  
         
         </Routes>
         </BrowserRouter>
         )}
         
           
         
            </div>
      }


    </div>
 
  )
}

export default WebApp