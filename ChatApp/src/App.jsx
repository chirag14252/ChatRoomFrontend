import { useState ,useEffect} from 'react'
import io from 'socket.io-client';
import {nanoid} from "nanoid";
import './App.css'
 
function App() {
  //create a connection with the backend where server is listening
const socket = io("http://localhost:3000"); 

const [message,setMessage] = useState('');

const [chat,setChat] = useState([]);

useEffect(()=>{
 socket.on('chat',(payload)=>{
   setChat([...chat,payload]);
 })
});

//submit handler

const formSubmitHandler = (e)=>{
  e.preventDefault();
  socket.emit("chat",{message});
  setMessage('');
}



  return (
    <>
     <h1>Chatty App</h1>
     <form onSubmit={formSubmitHandler}>
      <label htmlFor='msg'>Type your message : </label>
      <input type="text" id = "msg" placeholder='type your chat' value={message} onChange={(e)=>{setMessage(e.target.value)}}/>
      <button type='submit'>Send</button>
      
     </form>
     {
        chat.map((data,i)=>{
         return <p key={i}>{data.message}</p>
        })
      }
    </>
  )
}

export default App
