import { Routes, Route } from 'react-router'
import { UserProvider } from './context/UserContext'
import './styles/App.css';
import IntroPage from './pages/IntroPage';
import ChatPage from './pages/ChatPage'

function App() {
  return (
    <UserProvider>
    <div className="App">
      <Routes>
        <Route index element={<IntroPage/>} />
        <Route path="/chat" element={<ChatPage/>} />
      </Routes>
    </div>
    </UserProvider>
  );
}

export default App;
