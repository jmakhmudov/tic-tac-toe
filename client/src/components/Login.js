import React, {useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Game from "./Game";

function Login() {
    const cookies = new Cookies();
    const [user, setUser] = useState(null)
    const [room, setRoom] = useState(null)
    const [auth, setAuth] = useState(false)

    const LogIn = () => {
        axios.post("http://localhost:5000/login", {user, room}).then (res => {
            const {user, room, userId} = res.data;

            cookies.set("user", user);
            cookies.set("room", room);
            cookies.set("userId", userId);
            setAuth(true);
        });
    }


    return (
        <div>
            {auth ? <Game/> :
            <div className="login-box">
                <label>Start game</label>
                <input placeholder="Name" type="text" onChange={(e) => {
                    setUser(e.target.value)
                }}/>
                <input placeholder="Room ID" type="text" onChange={(e) => {
                    setRoom(e.target.value)
                }}/>
                <button className="submit-btn" onClick={LogIn}>Play</button>
            </div>}
        </div>
    )
}

export default Login;