import React from 'react'
import './App.css';
import Sidebar from './Sidebar';
import ChatRoom from './ChatRoom';
import Login  from './Component/Login';

import {
  Routes,
  Route,
} from "react-router-dom"
import { BrowserRouter } from 'react-router-dom';
import {useAuthState} from 'react-firebase-hooks/auth'
import  { auth } from './db';
import { CircularProgress } from '@mui/material';

const Mobapp = () => {
  const [user,loading] = useAuthState(auth)

  
  return (
 
    <div className="App">
    <h4>Rooms Made by Nainesh</h4>
    {loading? <h1><CircularProgress /></h1>:
     <div className="app_body">
     {!user?(
     <Login/>
      
    ):(
    <BrowserRouter>
    <Routes>
    <Route path='/' element = {<Sidebar/>}/>  
    <Route path=':type/:id' element = {<ChatRoom/>}/>  
    </Routes>
    </BrowserRouter>
    )}
    
    
    
     </div>
    }


  </div>
  )
}

export default Mobapp