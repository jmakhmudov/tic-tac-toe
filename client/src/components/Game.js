import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import '../styles/Game.css';

function Game() {
    const cookies = new Cookies()
    const room = cookies.get("room")
    const [player2, setPlayer2] = useState(null);
    const [val, setVal] = useState(["","","","","","","","",""])
    const [turn, setTurn] = useState('X');


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
        
        setTurn(turn==='X'?'O':'X');
        syncServer();
        setInterval(() => {
            axios.post("http://localhost:5000/turns", {room}).then(res => {
                 if (res.data[0].turns !== val) {
                    setVal(JSON.parse(res.data[0].turns));
                    clearInterval();
                }
            })
        }, 2000)
        renderTable()
    }

    useEffect(() => {
        setInterval(() => {
            axios.post("http://localhost:5000/wait", {room}).then(res => {
                if (res.data[0].player2) {
                    cookies.set("rival", res.data[0].player2);
                    setPlayer2(res.data[0].player2);
                }
                if (player2) {
                    clearInterval();
                }
            })
        }, 2000)
    }, [])

    useEffect(() => {
        console.log(val)
    }, [val])

    const syncServer = () => {
        const v = JSON.stringify(val);
        axios.post("http://localhost:5000/setTurns", {v, room})
    }

    return (
        <div className="game-box">
            {player2 ? 
            <div className="table-box">
                <button id="0" className="table-btn" onClick={(e) => {handleClick(e)}}>{val[0]}</button>
                <button id="1" className="table-btn" onClick={(e) => {handleClick(e)}}>{val[1]}</button>
                <button id="2" className="table-btn" onClick={(e) => {handleClick(e)}}>{val[2]}</button>
                <button id="3"className="table-btn" onClick={(e) => {handleClick(e)}}>{val[3]}</button>
                <button id="4" className="table-btn" onClick={(e) => {handleClick(e)}}>{val[4]}</button>
                <button id="5" className="table-btn" onClick={(e) => {handleClick(e)}}>{val[5]}</button>
                <button id="6" className="table-btn" onClick={(e) => {handleClick(e)}}>{val[6]}</button>
                <button id="7" className="table-btn" onClick={(e) => {handleClick(e)}}>{val[7]}</button>
                <button id="8" className="table-btn" onClick={(e) => {handleClick(e)}}>{val[8]}</button>

            </div> : 
            <h1>Waiting for the opponent</h1>
            }
        </div>
    )
};

export default Game;