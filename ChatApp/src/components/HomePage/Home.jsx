import { useState, useEffect } from 'react'
import { connectSocket, socket } from "../../../Socket.js"
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios"
import { Helmet } from 'react-helmet';
import "./home.css"



const Home = () => {
  const navigate = useNavigate();


  const [message, setMessage] = useState('');
  const [username, setName] = useState('');
  const [chat, setChat] = useState([]);
 //for fetching the previously written data
  useEffect(()=>{
    axios.get("http://localhost:3000/getMessage").then((res)=>{
    setChat(res.data.message)
  })
  },[])

  //for fetching the realtime data
  useEffect(() => {
    localStorage.setItem("user", false);
    
    if (!socket) connectSocket();

    socket.on('chat', (payload) => {
      setChat([...chat, payload]);
    })
  });
  // the data from the entryPage
  const name = useLocation();

  // submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (message.length > 0 && name.state) {
      {
        socket.emit('chat', { message: message, username: name.state });
        const reqBody = {
          "username": name.state,
          "message": message
        }
        axios.post("http://localhost:3000/userActivity",reqBody).then(()=>{
          console.log("message sent");
        });
        setMessage("");
      }
    }
    else {
      alert("pls go back and enter your username again");
    }

  }

return (
  <div className='home-section'>
    <Helmet>
         <style>{'body { background:url("http://forums.crackberry.com/attachments/blackberry-10-wallpapers-f308/137432d1361639896t-z10-wallpaper-set-z10-music.jpg")'}</style>
    </Helmet>
    <button onClick={() => {
      localStorage.removeItem("is_present");
      navigate("/");
    }}>back</button>
    <h1 className='heading'>Chat App</h1>
    <form onSubmit={formSubmitHandler}>

      <input type="text" id="msg" placeholder='type your chat' value={message} onChange={(e) => { setMessage(e.target.value) }} />

      <button type='submit'>Send</button>

    </form>
    {
      chat.map((data, i) => {
        return <div class="speech-wrapper" key={i}>
          <div class="bubble">
            <div class="txt">
              <p class="name">{data.username}</p>
              <p class="message">{data.message}</p>
              <span class="timestamp">10:20 pm</span>
            </div>
            <div class="bubble-arrow"></div>
          </div>
        </div>

      })
    }

<div class="wrapper">
  <ul>
    <li>hello,are we meeting today?</li>
    <li>yes,what time suits you?</li>
    <li>i was thinking after lunch,i have a meeting in the morning</li>
    <li>maybe another day?</li>
    <li>that's all right,what's about you? what are you going to do?</li>
    <li>i have no idea,go out for a walk or watching tv in home</li>
    <li>hello,are we meeting today?</li>
    <li>yes,what time suits you?</li>
    <li>i was thinking after lunch,i have a meeting in the morning</li>
    <li>maybe another day?</li>
    <li>that's all right,what's about you? what are you going to do?</li>
    <li>i have no idea,go out for a walk or watching tv in home</li>
  </ul>
</div>
  </div>
)
  }


export default Home;