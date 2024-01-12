import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import db ,{auth}from './db';
import * as EmailValidator from 'email-validator';
//importing materials
// import { doc, updateDoc, setDoc, query, where, arrayUnion } from "firebase/firestore";
import { addDoc , onSnapshot, query, where} from "firebase/firestore";

import { collection } from "firebase/firestore";
import Avatar from '@mui/material/Avatar';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Tooltip } from '@mui/material';
import {  Search } from '@mui/icons-material';
import SidebarChat from './Component/SidebarChat';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import SidebarPrivate from './Component/SidebarPrivate';
import Oppname from './utils/Oppname';
// import { signOut } from 'firebase/auth';
const Sidebar = () => {
    const [rooms, setRooms] = useState([]);
    const [user] = useAuthState(auth)
const ChatRef = query(collection(db, "privateChats"), where("users", "array-contains",user.email))// Returns all the chats where current user is involved.
const [chatSnapshot] = useCollection(ChatRef)
const [privateChats, setprivateChats] = useState([])
// const [allChat, setallChat] = useState([])
useEffect(() => {
    const getSidebarChats = async () => {
     try {
          onSnapshot(collection(db, "rooms"), (querySnapshot) => {
                    setRooms(querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                });

            onSnapshot(ChatRef , (querySnapshot) =>{
                setprivateChats(querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),

                })))
            })
            
            } catch (error) {
                console.error(error)
            }

        }
        getSidebarChats();
        // const newAllChat = [...rooms,...privateChats]
        //     setallChat(newAllChat)
    }, [])


    const CreateRoom = async () => {

        // Add a new document with a generated id.

        const roomname = prompt("Enter Room name")
        if (roomname) {
            try {
                addDoc(collection(db, "rooms"), {
                    name: roomname

                });
            } catch (error) {
                console.error(error)
            }

        }
    }
    const CreateChat = async () => {

        // Add a new document with a generated id.
        const input = prompt("Enter Email To Start a Chat");
        if(!input) return null ;
        if(input !== user.email && EmailValidator.validate(input) && !ChatExists(input)){
            console.log(`${input} is new user`);
            
            try {
                addDoc(collection(db, "privateChats"), {
                    users: [user.email, input],
                    name:"demo"
                });
            } catch (error) {
                console.error(error)
            }
        }else{
            alert("Enter Valid Email OR Chat already exists.")
        }
    }

const ChatExists = (EnteredEmail) => {
    return !!chatSnapshot?.docs.find((chat) => chat.data().users.find((user)=> user === EnteredEmail)?.length>0)
}
    return (
        <div className='sidebar'>
            <div className="sidebar-header">

                <Tooltip title="Log Out">
  <IconButton onClick={()=> auth.signOut()} >
  <Avatar src={user.photoURL} />

  </IconButton>
</Tooltip>
                <div className="sidebar-header-right" >
                    {/* icon button provide some good animation */}
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>

                </div>
            </div>
            <div className="sidebar-search">
                <div className="sidebar-searchcontaier">
                    <Search /> <input type="text" className='sidebar-search-input' placeholder='Search here' />
                </div>
            </div>
            <div className="button-container">
            <button className='sidebar-newchat' onClick={CreateRoom}>
                Create New Public Room
            </button>
            <button className='sidebar-newchat' onClick={CreateChat}>
                Create New Chat
            </button>
            </div>
        

            <div className="sidebar-chat-section">


                {privateChats.map(room => (<SidebarPrivate key={room.id} id={room.id} name={Oppname(room.data.users,user.email)} />))}
                {rooms.map(room => (<SidebarChat key={room.id} id={room.id} name={room.data.name} />))}



            </div>


        </div>
    )
}

export default Sidebar;