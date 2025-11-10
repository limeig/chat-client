import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router';

const IntroPage = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const [nameInput, setNameInput] = useState('')
  const setName = () => {
    user.current.name = nameInput;
    navigate("/chat")
  }
  return(
    <>
    <p>Hello! What is your name?</p>
    <input value={nameInput} onChange={(e) => setNameInput(e.target.value)}></input>
    <button onClick={setName}>Chat</button>
    </>
  )
}

export default IntroPage;