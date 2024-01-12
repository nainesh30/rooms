import React, { useEffect, useState , useRef} from 'react'
import './Chatroom.css'
import { Link, useParams } from 'react-router-dom'
import { Avatar } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ArrowLeft, AttachFile, EmojiEmotionsOutlined, Search } from '@mui/icons-material';
import { collection, onSnapshot ,addDoc, doc, getDoc, orderBy, query, serverTimestamp} from "firebase/firestore";
import db ,{auth}from './db';
import Chat from './Component/Chat';
import { useAuthState } from 'react-firebase-hooks/auth';
import Oppname from './utils/Oppname';
import InvalidPage from './Component/InvalidPage';

const ChatRoom = () => {
const [user] = useAuthState(auth);
const bodys = useRef()
const [LastSeen, setLastSeen] = useState("")
let {id,type} = useParams() //Fetching room id from url
const [messages, setmessages] = useState([])
const [input, setinput] = useState("")
const [Roomname, setRoomname] = useState("")
const [valid,setValid] = useState(true)

const createchat = (e)=>{
  e.preventDefault()
  if(input){
    addDoc(collection(db,`${type}`,`${id}`,"chats"), {
      name: user.displayName,
      userId : user.uid,
      message:input,
      timestamp: serverTimestamp(),
    readby: []
    });
setinput('')
  }
else{
  return null
}

}
useEffect(() => {
  const targetpostion = bodys.current?.scrollHeight
  bodys.current?.scrollTo({top: targetpostion , behavior: 'smooth'}) 

  
}, [messages])

useEffect(() => {
const checkUser = (data)=>{
    //check whether current user in array
    return !! data.users.find(e=> e===user.email)
   }
  setmessages([])
  const fetchroomName = async ()=>{
    const docRef = doc(db, `${type}`, `${id}`);
    const docSnap = await getDoc(docRef);
    try {
      if (type==="rooms" && docSnap?.data()) {
        setRoomname(docSnap.data().name)
        setValid(true)

      }
      else if(docSnap?.data()){
        setRoomname(Oppname(docSnap.data().users,user.email))
        setValid(true)
        if(!checkUser(docSnap?.data())){
          setValid(false)
        }
      }
      else{
        setValid(false)
      }
    } catch (error) {
      console.log(error);
    }
   
  }

fetchroomName() // const chatColl = collection(db,"rooms","9ThS9IBCE6cyhrPAhphd","chats")
    onSnapshot(query(collection(db, `${type}`,id,"chats"),orderBy('timestamp','asc')), (querySnapshot) => {
     setLastSeen(querySnapshot.docs[querySnapshot.docs.length-1]?.data().timestamp?.toDate().toUTCString());
      setmessages(querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
      })))
  });
}, [id,type,user])
if(!valid) return <InvalidPage/>
  return (
    <div className='ChatRoom' >
      <div className="chat-head">
        <div className="chat-head-left">
          <Link to= '/'>
          <ArrowLeft className='Arrow-back'/>
          </Link>
          <Avatar/> 
          <div className="chat-head-left-info">
          <h3>{Roomname}</h3>
          <p>{LastSeen}</p>
          </div>
        </div>
        <div className="chat-head-right">
          <Search/>
          <AttachFile/>
          <MoreVertIcon />
        </div>
      </div>

      <div className="chat-body"  ref={bodys} >
        {messages.map((chat)=> <Chat userId = {chat.data.userId} message={chat.data.message} timestamp = {chat.data.timestamp}key = {chat.id}name={chat.data.name}/>)}
      </div>

      <div className="chat-footer">
        <EmojiEmotionsOutlined/>

        <form  onSubmit={createchat}>
      <input type="text" value={input} placeholder='Type a message' onChange={(e)=> setinput(e.target.value)} />
          <button  onClick={createchat} className='send-button'>Send Message</button>
          <button  onClick={createchat} className='send-button-mob'>Send</button>
        </form>
      </div>
      </div>
  )
}

export default ChatRoom