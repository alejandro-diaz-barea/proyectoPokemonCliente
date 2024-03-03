import { createContext, useState } from 'react'

// Crea un contexto de usuario
export const UserContext = createContext()

const UserProvider = ({ children }) => {

  // Estado que indica si el usuario está logeado
  const [loggedIn, setLoggedIn] = useState(false)

  // Estado que almacena la información del usuario
  const [user, setUser] = useState(null)

  // Función para realizar el inicio de sesión del usuario
  const login = (userData) => {
    setLoggedIn(true)
    setUser({
      ...userData,
    })
  }

  // Función para cerrar sesión del usuario
  const logout = () => {
    setLoggedIn(false)
    setUser(null)
  }

  // Función para actualizar la información del usuario
  const updateUser = (newUserData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...newUserData,
    }))
  }

  // Proporciona el contexto y sus valores a los componentes secundarios
  return (
    <UserContext.Provider value={{ loggedIn, user,setUser, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
