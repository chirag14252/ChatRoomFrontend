import "./LoginForm.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const LoginForm = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();
const gotoHome = () => {
        if(name.length>0){
        localStorage.setItem('is_present',true);
        navigate("/Home",{state:name});
        }
        else{
            alert("name must be of atleast 1 character");
        }
    }

    return (
        <div>
            <div class="background">
                <div class="shape"></div>
                <div class="shape"></div>
            </div>
            <form className="form-Login">
                <h3>Login Here</h3>

                <label className = "label-form"for="username">Enter your Name</label>
                <input type="text" placeholder="name" id="username" onChange={(e)=>{
                   setName(e.target.value);
                }}/>

                <button className="login-button" onClick={gotoHome}>Enter the chat</button>
            </form>
        </div>
    )
}


export default LoginForm;