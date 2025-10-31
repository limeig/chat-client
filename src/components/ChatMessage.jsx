import "../styles/ChatMessage.css";

const ChatMessage = ({ message, sender, thisUser }) => {
  return (
    <div className={sender === thisUser ? "message right" : "message left"}>
        <div className="sender">{sender}</div>
        <div className="sender_image"></div>
        <div className="text">
          {message}
        </div>
      </div>
  );
};
export default ChatMessage;
