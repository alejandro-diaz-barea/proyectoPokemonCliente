import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import '../assets/css/pages/Favoritos.css'

const Favoritos = () => {
  const { user, updateUser } = useContext(UserContext)
  const navigate = useNavigate()

  // Estado para almacenar detalles de los Pokémon favoritos
  const [favoritePokemonDetails, setFavoritePokemonDetails] = useState([])

  // Efecto para cargar los detalles de los pokemones favoritos cuando cambia el usuario
  useEffect(() => {
    // Función asincrónica para obtener detalles de Pokémon favoritos
    const fetchFavoritePokemonDetails = async () => {
      const favoritos = user?.favoritos || []

      try {
        // Mapear los nombres de los favoritos y obtener detalles para cada uno
        const detailsPromises = favoritos.map(async (favorito) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${favorito.name}`)
          const data = await response.json();
          return {
            ...favorito,
            details: data,
          }
        })

        // Esperar a que se resuelvan todas las promesas y establecer los detalles en el estado
        const details = await Promise.all(detailsPromises)
        setFavoritePokemonDetails(details)
      } catch (error) {
        console.error('Error al obtener detalles de los Pokémon favoritos:', error)
        setFavoritePokemonDetails([])
      }
    }

    // Llamar a la función para cargar detalles cuando cambie el usuario
    fetchFavoritePokemonDetails()
  }, [user])

  // Cuando pulse en el card se vaya a los detalles del pokemon
  const handlePokemonClick = (pokemonName) => {
    navigate(`/detalles-pokemon/${pokemonName}`)
  }

  // Manejar la eliminación de un Pokémon de la lista de favoritos
  const handleRemoveFavorite = (pokemonName) => {
    // Lógica para eliminar el Pokémon de favoritos
    const updatedFavorites = user.favoritos.filter((favorito) => favorito.name !== pokemonName)

    // Actualizar información en localStorage
    const clients = JSON.parse(localStorage.getItem('clientes')) || []
    const updatedClients = clients.map((client) => {
      if (client.email === user.email) {
        return {
          ...client,
          favoritos: updatedFavorites,
        }
      }
      return client
    });
    localStorage.setItem('clientes', JSON.stringify(updatedClients))

    // Actualizar el contexto del usuario con la nueva lista de favoritos
    updateUser({ ...user, favoritos: updatedFavorites })
  }

  return (
    <div className="favoritos-container">
      <h2>Tus Pokémon Favoritos</h2>
      {favoritePokemonDetails.length > 0 ? (
        <div className="favoritos-cards-container">
          {favoritePokemonDetails.map((favorito, index) => (
            <div key={index} className="favoritos-pokemon-card">
              <img
                src={favorito.details.sprites.other.dream_world.front_default}
                alt={favorito.name}
                onClick={() => handlePokemonClick(favorito.name)}
                className="favoritos-pokemon-card-img"
              />
              <div className="favoritos-card-details">
                <p className="favoritos-pokemon-name">{favorito.name}</p>
                <p className="favoritos-pokemon-types">
                  <strong>Type:</strong> {favorito.details.types.map((type) => type.type.name).join(', ')}
                </p>
                <button className="favoritos-button" onClick={() => handleRemoveFavorite(favorito.name)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No tienes Pokémon en tus favoritos.</p>
      )}
    </div>
  )
}

export default Favoritos
