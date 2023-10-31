import { useState, useEffect , useRef} from 'react';
import { connectSocket, socket } from "../../../Socket.js";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import "./home.css";
import NavBar from './NavBar/NavBar.jsx';
import InstanceAxios from "../../axios.js"


const Home = () => {
  
  const name = useLocation();
  const [message, setMessage] = useState('');
  const [username, setName] = useState('');
  const [chat, setChat] = useState([]);
  const messageContainerRef = useRef(null); 
  const [currentTimeDate,setCurrent] = useState('');

  useEffect(() => {
    InstanceAxios().get("/getMessage").then((res) => {
      setChat(res.data.message);
    });
    scroller();
    updateTime();
  }, []);

  useEffect(() => {
    if (!socket) connectSocket();

    socket.on('chat', (payload) => {
      setChat([...chat, payload]);
      
    });
    scroller();
   //date and time obj
    updateTime();


  }, [chat]); // Added [chat] as a dependency

const scroller = ()=>{
  if (messageContainerRef.current) {
    messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
  }
}
//time and date calculator
const updateTime = ()=>{
  let date = new Date().toLocaleDateString("de-DE");
   const now = new Date();
   const hours = now.getHours();
   const minutes = now.getMinutes();
   const time = hours+":"+minutes;
   setCurrent({date : date,time:time})
}

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (message.length > 0 && name.state) {
      socket.emit('chat', { message: message, username: name.state });
      const reqBody = {
        "username": name.state,
        "message": message
      };
     InstanceAxios().post("/userActivity", reqBody).then(() => {
        console.log("message sent");
      });
      setMessage("");
    } else {
      alert("Please go back and enter your username again");
    }
  };






  return (
    <>
     <NavBar date={currentTimeDate}/>
    <div className='home-section'>
      <Helmet>
        <style>{'body { background:url("http://forums.crackberry.com/attachments/blackberry-10-wallpapers-f308/137432d1361639896t-z10-wallpaper-set-z10-music.jpg")'}</style>
      </Helmet>
      
    

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
        <button type='submit' className='submit-home'><img src = "/send.png"></img></button>
      </form>
    </div>
    </>
  );
};

export default Home;
