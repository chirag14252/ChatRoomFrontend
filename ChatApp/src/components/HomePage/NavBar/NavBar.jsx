import "./NavBar.css"

const NavBar = ({date})=>{
    return(
        
        <div class="menu">
            <div className="time-now">{date.time}</div>
            <div class="back"><i class="fa fa-chevron-left"></i> <img src="https://i.imgur.com/DY6gND0.png" draggable="false"/></div>
            <div class="name-nav">A-410</div>
            <div class="last-nav">{date.date}</div>
           
        </div>
    )
}

export default NavBar;