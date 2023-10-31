import "./NavBar.css"
import { useNavigate } from "react-router-dom";

const NavBar = ({date})=>{
    const navigate = useNavigate();
    return(
        <div class="menu">
            <div className="time-now"> <button className = "backtoEntry" onClick={() => {
               localStorage.removeItem("is_present");
               navigate("/");
            }}><img src="/back.png"></img></button></div>
            <div class="back"><i class="fa fa-chevron-left"></i> <img src="https://i.imgur.com/DY6gND0.png" draggable="false"/></div>
            <div class="name-nav">A-410</div>
            <div class="last-nav">{date.date}</div>
        </div>   
    )
}

export default NavBar;