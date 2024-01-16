import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../assets/css/pages/PokemonDetails.css'

const PokemonDetails = () => {
  // Obtener el nombre del pokémon de los parámetros de la URL
  const { name } = useParams()

  // Estado para almacenar los detalles del pokémon
  const [pokemon, setPokemon] = useState(null)

  // Efecto para cargar los detalles del pokémon al montar el componente
  useEffect(() => {
    const fetchPokemon = async () => {
      try {

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)

        // dice si la solicitud fue exitosa
        if (!response.ok) {
          throw new Error('No se pudo encontrar el pokémon')
        }

        const data = await response.json()

        // Actualizar el estado con los detalles del pokémon
        setPokemon(data)
      } catch (error) {
        // Manejar errores de la solicitud
        console.error(error)
        alert('Ocurrió un error al cargar los detalles del pokémon');
      }
    }

    // Llamar a la función para cargar los detalles
    fetchPokemon()
  }, [name])

  // Verificar si los detalles del pokémon están cargando
  if (!pokemon) {
    return <div>Cargando...</div>
  }

  // Renderizar los detalles del pokémon
  return (
    <div className="details-container">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="pokemon-image"
      />
      <div className="details-info">
        <h1>{pokemon.name}</h1>
        <p>Número: {pokemon.id}</p>
        <p>Tipos:</p>
        <ul>
          {pokemon.types.map((type) => (
            <li key={type.slot}>{type.type.name}</li>
          ))}
        </ul>
        <p>Peso: {pokemon.weight} kg</p>
        <p>Altura: {pokemon.height} dm</p>
        {pokemon.abilities.map((ability) => (
          <p key={ability.slot}>Habilidad: {ability.ability.name}</p>
        ))}
      </div>
    </div>
  )
}

export default PokemonDetails
