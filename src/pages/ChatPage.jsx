import Chat from '../components/Chat'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import { Navigate } from "react-router";

const ChatPage = () => {
  const user = useContext(UserContext);
  if (!user.current.name) {
    return <Navigate to="/" replace />;
  }

  return(
    <>
    <Chat/>
    </>
  )
}

export default ChatPage;