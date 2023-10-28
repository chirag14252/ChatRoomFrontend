import { useState, useEffect , useRef} from 'react';
import { connectSocket, socket } from "../../../Socket.js";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Helmet } from 'react-helmet';
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const name = useLocation();
  const [message, setMessage] = useState('');
  const [username, setName] = useState('');
  const [chat, setChat] = useState([]);
  const messageContainerRef = useRef(null); 

  useEffect(() => {
    axios.get("http://localhost:3000/getMessage").then((res) => {
      setChat(res.data.message);
    });
    scroller();
  }, []);

  useEffect(() => {
    if (!socket) connectSocket();

    socket.on('chat', (payload) => {
      setChat([...chat, payload]);
     
    });
    scroller();
  }, [chat]); // Added [chat] as a dependency

const scroller = ()=>{
  if (messageContainerRef.current) {
    messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
  }
}

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (message.length > 0 && name.state) {
      socket.emit('chat', { message: message, username: name.state });
      const reqBody = {
        "username": name.state,
        "message": message
      };
      axios.post("http://localhost:3000/userActivity", reqBody).then(() => {
        console.log("message sent");
      });
      setMessage("");
    } else {
      alert("Please go back and enter your username again");
    }
  };

  return (
    <div className='home-section'>
      <Helmet>
        <style>{'body { background:url("http://forums.crackberry.com/attachments/blackberry-10-wallpapers-f308/137432d1361639896t-z10-wallpaper-set-z10-music.jpg")'}</style>
      </Helmet>
      <button onClick={() => {
        localStorage.removeItem("is_present");
        navigate("/");
      }}>Back</button>
      <h1 className='heading'>Chat App</h1>

      <div className='message-container'ref={messageContainerRef}>
        {chat.map((data, i) => {
          return (
            <div className="speech-wrapper" key={i}>
              <div className="bubble">
                <div className="txt">
                  <p className="name">{data.username}</p>
                  <p className="message">{data.message}</p>
                  <span className="timestamp">10:20 pm</span>
                </div>
                <div className="bubble-arrow"></div>
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={formSubmitHandler} className='fixed-form'>
        <input type="text" id="msg" placeholder='Type your chat' value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
};

export default Home;
