import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

const AddToFavorites = ({ pokemonName }) => {

  const { user, setUser } = useContext(UserContext)

  const navigate = useNavigate()

  // Estado local para rastrear si el Pokémon actual es un favorito del usuario
  const [isFavorite, setIsFavorite] = useState(false)

  // Efecto para actualizar el estado local cuando cambian los datos del usuario o el nombre del Pokémon
  useEffect(() => {
    if (user) {
      // Verificar si el Pokémon actual está en la lista de favoritos del usuario
      setIsFavorite(user.favoritos.some((fav) => fav.name === pokemonName))
    }
  }, [user, pokemonName])

  // Manejador de clicks para agregar o quitar el Pokémon de la lista de favoritos
  const handleToggleFavorites = (e) => {
    e.stopPropagation();

    // Verificar si el usuario está autenticado
    if (user) {
      // Obtener la lista de clientes del localStorage
      const existingClientes = JSON.parse(localStorage.getItem('clientes')) || []

      // Encontrar el índice del usuario actual en la lista
      const existingUserIndex = existingClientes.findIndex((c) => c.email === user.email)

      if (existingUserIndex !== -1) {
        // Obtener el usuario actual
        const existingUser = existingClientes[existingUserIndex]

        // Verificar si el Pokémon actual ya es un favorito
        const isCurrentlyFavorite = existingUser.favoritos.some((fav) => fav.name === pokemonName)

        let updatedFavoritos

        // Actualizar la lista de favoritos según el estado actual
        if (isCurrentlyFavorite) {
          updatedFavoritos = existingUser.favoritos.filter((fav) => fav.name !== pokemonName)
        } else {
          updatedFavoritos = [...existingUser.favoritos, { name: pokemonName }]
        }

        // Crear el usuario actualizado
        const updatedUser = { ...existingUser, favoritos: updatedFavoritos }

        // Actualizar el usuario en localStorage
        existingClientes[existingUserIndex] = updatedUser
        localStorage.setItem('clientes', JSON.stringify(existingClientes))

        // Actualizar el estado global del usuario
        setUser(updatedUser)

        // Actualizar el estado local de isFavorite
        setIsFavorite(!isCurrentlyFavorite)
      } else {
        console.log('Usuario no encontrado en localStorage');
      }
    } else {
      // Redirigir al usuario a la página de inicio de sesión si no está autenticado
      navigate('/iniciar-sesion')
    }
  };

  return (
    <button onClick={handleToggleFavorites} className='add-to-favorites-button'>
      {isFavorite ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}
    </button>
  )
}

export default AddToFavorites;
