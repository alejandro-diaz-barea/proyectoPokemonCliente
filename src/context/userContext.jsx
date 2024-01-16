import { createContext, useState } from 'react'

// Crea un contexto de usuario
export const UserContext = createContext()

const UserProvider = ({ children }) => {

  // Estado que indica si el usuario está logeado
  const [loggedIn, setLoggedIn] = useState(false)

  // Estado que almacena la información del usuario
  const [user, setUser] = useState(null)

  // Lista de fotos de Pikachu para elegir los fondo de perfil
  const pikachuPhotos = [
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10080.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10081.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10083.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10085.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10084.png',
  ]

  // Función para realizar el inicio de sesión del usuario
  const login = (userData) => {
    setLoggedIn(true)
    setUser({
      ...userData,
      pikachuPhoto: pikachuPhotos[0], // Tomamos la primera foto como predeterminada
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
    <UserContext.Provider value={{ loggedIn, user, login, logout, updateUser, pikachuPhotos, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
