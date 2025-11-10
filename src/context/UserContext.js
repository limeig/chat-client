import { createContext, useRef } from 'react'

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const user = useRef({
    name: undefined,
    id: crypto.randomUUID()
  });

  return(
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}
