import React, { useState } from "react";
import '../styles/Game.css';
import $ from "jquery";

function Game(props) {
    const [player2, setPlayer2] = useState(null);
    const [val, setVal] = useState(["","","","","","","","",""]);
    const [turn, setTurn] = useState('X');
    const socket = props.socket;

    socket.on("receive-info", (user) => {
        setPlayer2(user);  
        socket.emit("send", props.user, props.room);
    })

    socket.on("receive-first", (user) => {
        setTurn('O');
        setPlayer2(user); 
        $(document).ready(function() {
            for (let i=0;i<9;i++) {
                document.getElementById(i).disabled = true;
            }
        })
        
    })

    socket.on("receive-table", (value) => {
        setVal(value); 
        for (let i=0;i<9;i++) {
            if(value[i] === "") {
                document.getElementById(i).disabled = false;
            } else {
                document.getElementById(i).disabled = true;
            }
        }
        renderTable(value) 
    })

    const renderTable = (val) => {
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
            for (let i=0;i<9;i++) {
                document.getElementById(i).disabled = true;
            }
        })
        setTurn(turn==='X'?'O':'X');
    }


    return (
        <div className="game-box">
            {player2 ? 
            <div className="table-box">
                <button id="0"  className="table-btn" onClick={(e) => {handleClick(e)}}></button>
                <button id="1"  className="table-btn" onClick={(e) => {handleClick(e)}}></button>
                <button id="2"  className="table-btn" onClick={(e) => {handleClick(e)}}></button>
                <button id="3" className="table-btn" onClick={(e) => {handleClick(e)}}></button>
                <button id="4"  className="table-btn" onClick={(e) => {handleClick(e)}}></button>
                <button id="5"  className="table-btn" onClick={(e) => {handleClick(e)}}></button>
                <button id="6"  className="table-btn" onClick={(e) => {handleClick(e)}}></button>
                <button id="7"  className="table-btn" onClick={(e) => {handleClick(e)}}></button>
                <button id="8"  className="table-btn" onClick={(e) => {handleClick(e)}}></button>

            </div> : 
            <h1>Waiting for the opponent</h1>
            }
        </div>
    )
};

export default Game;