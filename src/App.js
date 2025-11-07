import { useRef } from 'react';
import Chat from './components/Chat';
import './styles/App.css';

function App() {
  const userID = useRef(crypto.randomUUID());
  return (
    <div className="App">
      <Chat userID={userID.current}></Chat>
    </div>
  );
}

export default App;
