import Login from './components/Login';
import './App.css';
import {io} from "socket.io-client";

function App() {
  const socket = io("http://localhost:5000", {
    transports: ["websocket"]
  });

  return (
    <div className="App">
      <Login socket={socket}/>
    </div>
  );
}

export default App;
