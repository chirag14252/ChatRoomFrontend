import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EntryPage.css"

const EntryPage = () => {

    const [name, setName] = useState('');
    const navigate = useNavigate();
   
    const gotoHome =
        () => {
            if(name.length>0){
            localStorage.setItem('is_present',true);
            navigate("/Home",{state:name});
            }
            else{
                alert("name must be of atleast 1 character");
            }
        }

    return (
        <>
            <label htmlFor="username" id="name_user">Enter your Name</label><br />
            <input type="text" id="username" onChange={(e) => {
                setName(e.target.value);
            }} />
            <br />
            <button onClick={ gotoHome }>Enter</button>
        </>
    )
}

export default EntryPage;