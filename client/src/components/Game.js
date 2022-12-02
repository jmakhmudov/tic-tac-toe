import React, { useState } from "react";
import '../styles/Game.css';
import $ from "jquery";

function Game(props) {
    const [player2, setPlayer2] = useState(null);
    const [val, setVal] = useState(["","","","","","","","",""]);
    const [turn, setTurn] = useState('X');
    const socket = props.socket;
    const combs = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

    const victory = (val) => {
        for (let comb of combs) {
            if (
                val[comb[0]] == val[comb[1]] 
                    &&
                val[comb[1]] == val[comb[2]] 
                    &&
                val[comb[0]] != ''
            ) {
                return true;
            }
        }
        return false;
    }

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
        if (victory(value)) {
            window.alert("You lose:(");
        };
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
        if (victory(a)) {
            window.alert("You won!");
        };
    }


    return (
        <div className="game-box">
            <p>Room ID: {props.room}</p>
            {player2 ? 
            <div>
                <p className="players"><span>{turn}</span> {props.user} VS {player2} <span>{turn==='X'?'O':'X'}</span></p>
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

            </div>
            </div> :
            <h1>Waiting for the opponent</h1>
            }
        </div>
    )
};

export default Game;