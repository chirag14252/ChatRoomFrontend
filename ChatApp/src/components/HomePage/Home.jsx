import { useState, useEffect } from 'react'
import io from 'socket.io-client';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import "./home.css"



const Home = () => {
  const navigate = useNavigate();
  const socket = io("http://localhost:3000");
  
  const [message, setMessage] = useState('');
  const [username,setName] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    localStorage.setItem("user",false);
    socket.on('chat', (payload) => {
      setChat([...chat, payload]);
    })
  });
// the data from the entryPage
const name = useLocation();

  //submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(message.length != 0){
    socket.emit('chat', { message:message,username: name.state});
    
    setMessage("");
    }
  }
  return (
    <div className='home-section'>
      <button onClick={()=>{
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
          return <div class="speech-wrapper">
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
         
         


      {/* end of demo section */}
    </div>

  )
}

export default Home;