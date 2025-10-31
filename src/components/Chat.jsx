import React from "react";
import "../styles/Chat.css";
import { MdSend } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import ChatMessage from "./ChatMessage";

const Chat = ({userID}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    let active = true;

    async function subscribe() {
      while (active) {
        try {
          console.log("Polling for new messages...");
          const { data } = await axios.get(
            "http://localhost:5000/poll-messages"
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

  const sendMessage = async () => {
    console.log("Sending message:", input);
    setInput("");
    return axios
      .post("http://localhost:5000/send-message", {
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
      <div className="message_box">
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
