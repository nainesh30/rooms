import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import db from '../db'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
const SidebarChat = ({name,id}) => {
const [Lastmessage, setLastmessage] = useState("")
  useEffect(() => {
    onSnapshot(query(collection(db,"rooms",`${id}`,"chats"),orderBy('timestamp', 'desc')),(querysnapshot)=>{
     const  data = querysnapshot.docs[0];
     if(!data){
      setLastmessage("Tap to Start Chatting")
     }else{
      // setLastmessage(data.data().message)
      setLastmessage(`${data.data().name} : ${data.data().message}`)

     }
    })

  }, [id])

  return (
    <Link to = {`rooms/${id}`} >
    <div className="siderbar-chat">
                
    <div className="sidebar-chat-info">
    <Avatar src={`https://api.dicebear.com/7.x/personas/svg?seed=Felix`}/>  <h4 className='sidebar-chat-name'>{name}</h4>
    </div>
    <p>{Lastmessage}</p>
</div>
 </Link>

  )
}

export default SidebarChat;