import React, {useState} from "react";
import Game from "./Game";
import '../styles/Login.css';

function Login(props) {
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
                <p>Tic-Tac-Toe</p>
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