import React from "react";
import "../styles/Chat.css";
import { MdSend } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    console.log("Subscribing to messages...");
    try {
      const { data } = await axios.get("http://localhost:5000/get-messages");
      setMessages((messages) => [...messages, data.message]);
      console.log(data.message);
      await subscribe();
    } catch (error) {
      console.error("Error fetching messages:", error);
      setTimeout(() => {
        subscribe();
      }, 1000);
    }
  };

  const sendMessage = async () => {
    setInput("");
    return axios
      .post("http://localhost:5000/send-message", {
        id: Date.now(),
        message: input,
      })
      .then((response) => {
        console.log("Message sent:", response.data);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  return (
    <div className="chat">
      <div className="message__box">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <form className="input__box" onSubmit={sendMessage}>
        {" "}
        <input
          className="message__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button className="message__button" onClick={sendMessage}>
          <MdSend size={35} />
        </button>
      </form>
    </div>
  );
};

export default Chat;
