import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import {auth} from '../db'
const Chat = ({name,message,timestamp,userId}) => {

 const [user] = useAuthState(auth)
  return (
    <p  className={`chatMessage ${userId === user.uid && `chat-receiver`}`}>
    <span className="sender-name">{name}</span>
    {message}
    <span className="chat-time">{new Date(timestamp?.toDate()).toUTCString()}</span>
  </p>
  )
}

export default Chat