import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import db from '../db'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
const SidebarPrivate = ({name,id}) => {
const [Lastmessage, setLastmessage] = useState("")
  useEffect(() => {
    onSnapshot(query(collection(db,"privateChats",`${id}`,"chats"),orderBy('timestamp', 'desc')),(querysnapshot)=>{
     const  data = querysnapshot.docs[0];
     if(!data){
      setLastmessage("Tap to Start Chatting")
     }else{
      setLastmessage(`${data.data().name}:${data.data().message}`)

     }
    })

  }, [id])

  return (
    <Link to = {`privateChats/${id}`} >
    <div className="siderbar-chat">
                
    <div className="sidebar-chat-info">
    <Avatar src={`https://api.dicebear.com/7.x/personas/svg?seed=Felix`}/>  <h4 className='sidebar-chat-name'>{name}</h4>
    </div>
    <p>{Lastmessage}</p>
</div>
 </Link>

  )
}

export default SidebarPrivate;