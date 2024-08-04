import React, { createContext, useState } from "react"

export const MyContext = createContext()

export const MyProvider = ({ children }) => {
  const [token, setToken] = useState("")
  const [city, setCity] = useState([])
  const [state, setState] = useState("")
  const [role, setRole] = useState()
  const [auth, setAuth] = useState(false)
  const [userId, setUserId] = useState()
  const [user, setUser] = useState(null)
  // methods to update context state
  function resetContextState() {
    setToken("")
    setCity([])
    setState("")
    setRole("")
    setAuth(false)
    setUserId("")
    setUser(null)
  }

  return (
    <MyContext.Provider
      value={{
        token,
        setToken,
        city,
        setCity,
        state,
        setState,
        setRole,
        role,
        setAuth,
        auth,
        userId,
        setUserId,
        user,
        setUser,
        resetContextState,
      }}
    >
      {children}
    </MyContext.Provider>
  )
}
