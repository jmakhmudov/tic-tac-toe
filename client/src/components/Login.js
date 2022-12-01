import React from "react";

function Login() {
    const [user, setUser] = React.useState(null)

    const LogIn = () => {
        
    }

    return (
        <div className="login-box">
            <label>Start game</label>
            <input placeholder="Name" type="text" onChange={(e) => {
                setUser({...user, name: e.target.value})
            }}/>
            <input placeholder="Room ID" type="text" onChange={(e) => {
                setUser({...user, gameId: e.target.value})
            }}/>
            <button className="submit-btn" onClick={LogIn}>Play</button>
        </div>
    )
}

export default Login;