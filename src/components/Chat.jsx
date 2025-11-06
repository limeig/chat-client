import React, { useRef } from "react";
import "../styles/Chat.css";
import { MdSend } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import ChatMessage from "./ChatMessage";

const Chat = ({userID}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesRef = useRef(null);

  useEffect(() => {

    axios.get("http://localhost:5000/messages")
      .then((response) => { 
        console.log("Initial messages fetched: ", response.data);
        setMessages(response.data.messages);
      })
      .catch((error) => {
        console.error("Error fetching initial messages:", error);
      });
    
    let active = true;

    async function subscribe() {
      while (active) {
        try {
          console.log("Polling for new messages...");
          const { data } = await axios.get(
            "http://localhost:5000/messages/poll"
          );
          
          console.log("Poll response data: ", data);
          if (!data.message) {
            continue;
          }
          setMessages((messages) => [...messages, data.message]);
          console.log("Get message: ", data.message);
        } catch (error) {
          console.error("Error fetching messages:", error);
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }

    subscribe();

    return () => {
      active = false;
    };
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    console.log("Scrolling to bottom");
    const messageBox = messagesRef.current;
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    console.log("Sending message:", input);
    setInput("");
    return axios
      .post("http://localhost:5000/message", {
        id: Date.now(),
        message: {
          text: input,
        }
      }, {headers: { Authorization: userID }})
      .then((response) => {
        console.log("Message sent");
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  return (
    <div className="chat">
      <div className="message_box" ref={messagesRef}>
        {
          messages.map((message, index) => {
            console.log("Rendering message: ", message)
            return (      
            <ChatMessage key={index} message={message.text} sender={message.sender} thisUser={userID}/>
        )})
        }
      </div>
      <div className="input_box">
        <input
          className="message_input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button className="send_button" onClick={sendMessage}>
          <MdSend size={35} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
