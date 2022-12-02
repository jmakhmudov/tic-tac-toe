import Login from './components/Login';
import './App.css';
import {io} from "socket.io-client";

function App() {
  const socket = io("https://tic-tac-toe-production-053e.up.railway.app/", {
    transports: ["websocket"]
  });

  return (
    <div className="App">
      <Login socket={socket}/>
    </div>
  );
}

export default App;
