import React, {useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Game from "./Game";

function Login(props) {
    const cookies = new Cookies();
    const [user, setUser] = useState(null)
    const [room, setRoom] = useState(null)
    const [auth, setAuth] = useState(false)
    const socket = props.socket

    socket.on("connect", () => {
        console.log(socket.id)
    })

    const LogIn = () => {
        socket.emit("join-room", user, room, () => {
            setAuth(true);
        });
    }


    return (
        <div>
            {auth ? <Game socket={props.socket}
            user={user} room={room}/> :
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