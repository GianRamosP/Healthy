import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [successMessage, setSuccessMessage] = useState('')

  return (
    <AuthContext.Provider value={{ successMessage, setSuccessMessage }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
