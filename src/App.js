import React from 'react';
import Chat from './components/Chat';
import './styles/App.css';

function App() {
  const userID = crypto.randomUUID();
  return (
    <div className="App">
      <Chat userID={userID}></Chat>
    </div>
  );
}

export default App;
