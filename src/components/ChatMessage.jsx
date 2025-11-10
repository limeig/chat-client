import { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import "../styles/ChatMessage.css";

const ChatMessage = ({ message, sender }) => {
  const user = useContext(UserContext);

  return (
    <div className={sender.id === user.current.id ? "message right" : "message left"}>
        <div className="sender">{sender.name}</div>
        <div className="sender_image"></div>
        <div className="text">
          {message}
        </div>
      </div>
  );
};
export default ChatMessage;
