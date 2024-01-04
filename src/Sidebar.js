import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import db ,{auth}from './db';

//importing materials
// import { doc, updateDoc, setDoc, query, where, arrayUnion } from "firebase/firestore";
import { addDoc , onSnapshot} from "firebase/firestore";

import { collection } from "firebase/firestore";
import Avatar from '@mui/material/Avatar';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Tooltip } from '@mui/material';
import {  Search } from '@mui/icons-material';
import SidebarChat from './Component/SidebarChat';
import { useAuthState } from 'react-firebase-hooks/auth';
// import { signOut } from 'firebase/auth';
const Sidebar = () => {
    const [rooms, setRooms] = useState([]);
    const [user] = useAuthState(auth)

useEffect(() => {
    const getroom = async () => {
 try {
          onSnapshot(collection(db, "rooms"), (querySnapshot) => {
                    setRooms(querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                });
            } catch (error) {
                console.error(error)
            }

        }
        getroom()

    }, [])


    const clickbutton = async () => {

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
    return (
        <div className='sidebar'>
            <div className="sidebar-header">

                <Tooltip title="Log Out">
  <IconButton>
  <Avatar  onClick={()=> auth.signOut()} src={user.photoURL} />

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
            <button className='sidebar-newchat' onClick={clickbutton}>

                Create New Room
            </button>

            <div className="sidebar-chat-section">


                {rooms.map(room => (<SidebarChat key={room.id} id={room.id} name={room.data.name} />))}



            </div>


        </div>
    )
}

export default Sidebar;