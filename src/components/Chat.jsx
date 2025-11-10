import React, { useRef } from "react";
import "../styles/Chat.css";
import { MdSend } from "react-icons/md";
import { useState, useEffect } from "react";
import { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import axios from "axios";
import ChatMessage from "./ChatMessage";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesRef = useRef(null);

  const user = useContext(UserContext);
  console.log('Current user ', user.current);
  
  useEffect(() => {
    const controller = new AbortController();

    axios.get("http://localhost:5000/messages", {
      headers: { Authorization: user.id },
      signal: controller.signal,
      })
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
            "http://localhost:5000/messages/poll",
            {
              headers: { Authorization: user.id },
              signal: controller.signal,
          });
          
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
      console.log("Unmounting chat component");
      active = false;
      controller.abort();
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
      .post("http://localhost:5000/messages", {
        id: Date.now(),
        message: {
          text: input,
          sender: user.current
        }
      }, {headers: { Authorization: user.id }})
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
            <ChatMessage key={index} message={message.text} sender={message.sender}/>
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
