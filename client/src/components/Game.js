import React, { useState } from "react";
import '../styles/Game.css';

function Game(props) {
    const [player2, setPlayer2] = useState(null);
    const [val, setVal] = useState(["","","","","","","","",""]);
    const [turn, setTurn] = useState('X');
    const socket = props.socket;

    socket.on("receive-info", (user) => {
        if (!player2) {
            setPlayer2(user);
        } else {
            socket.emit("send", props.user, props.room)  
        }
    })

    socket.on("receive-table", (value) => {
        setVal(value)  
        console.log(value)
        renderTable() 
    })

    const renderTable = () => {
        for (let i=0;i<9;i++) {
            document.getElementById(i).innerText = val[i];
        }
    }

    const handleClick = (e) =>{
        const id = e.target.id;
        const a = val.map((el, idx) => {
            if (idx == id) {
                console.log(1)
                return turn;
            } else {
                return el;
            }
        })
        document.getElementById(id).innerText = turn;
        setVal(a);
        socket.emit("table", a, props.room, () => {

        })
        setTurn(turn==='X'?'O':'X');
    }


    return (
        <div className="game-box">
            {player2 ? 
            <div className="table-box">
                <button id="0" className="table-btn" onClick={(e) => {handleClick(e)}}></button>
                <button id="1" className="table-btn" onClick={(e) => {handleClick(e)}}></button>
                <button id="2" className="table-btn" onClick={(e) => {handleClick(e)}}></button>
                <button id="3"className="table-btn" onClick={(e) => {handleClick(e)}}></button>
                <button id="4" className="table-btn" onClick={(e) => {handleClick(e)}}></button>
                <button id="5" className="table-btn" onClick={(e) => {handleClick(e)}}></button>
                <button id="6" className="table-btn" onClick={(e) => {handleClick(e)}}></button>
                <button id="7" className="table-btn" onClick={(e) => {handleClick(e)}}></button>
                <button id="8" className="table-btn" onClick={(e) => {handleClick(e)}}></button>

            </div> : 
            <h1>Waiting for the opponent</h1>
            }
        </div>
    )
};

export default Game;