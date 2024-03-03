import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../assets/css/pages/PokemonDetails.css'

const PokemonDetails = () => {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)

        if (!response.ok) {
          throw new Error('No se pudo encontrar el pokémon')
        }

        const data = await response.json()
        setPokemon(data)
      } catch (error) {
        console.error(error)
        setError('Ocurrió un error al cargar los detalles del pokémon') 
      }
    }

    fetchPokemon()
  }, [name])

  if (error) {
    return <div>{error}</div>
  }

  if (!pokemon) {
    return <div>Cargando...</div>
  }

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
