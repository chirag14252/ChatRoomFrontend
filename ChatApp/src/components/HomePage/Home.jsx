import { useState, useEffect } from 'react'
import io from 'socket.io-client';
import { nanoid } from "nanoid";
import "./home.css"


const Home = () => {
  const socket = io("http://localhost:3000");

  const [message, setMessage] = useState('');

  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('chat', (payload) => {
      setChat([...chat, payload]);
    })
  });

  //submit handler

  const formSubmitHandler = (e) => {
    e.preventDefault();
    socket.emit('chat', { message });
    setMessage("");
  }
  return (
    <div className='home-section'>
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
              <p class="name">Benni</p>
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