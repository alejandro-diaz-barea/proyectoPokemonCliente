import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './PokemonDetails.css';

const PokemonDetails = () => {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [evolutions, setEvolutions] = useState(null)

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        if (!response.ok) {
          throw new Error('No se pudo encontrar el pokémon')
        }
        const data = await response.json()
        setPokemon(data)
        setEvolutions(data.evolutions)
      } catch (error) {
        console.error(error)
        alert('Ocurrió un error al cargar los detalles del pokémon')
      }
    }

    fetchPokemon()
  }, [name])

  if (!pokemon) {
    return <div>Cargando...</div>
  }

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        style={{ width: '500px', height: '500px' }}
      />
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
      <h2>Evoluciones</h2>
      {evolutions &&
        evolutions.map((evolution) => (
          <div key={evolution.id}>
            <img
              src={evolution.sprites.front_default}
              alt={evolution.name}
              style={{ width: '100px', height: '100px' }}
            />
            <p>{evolution.name}</p>
          </div>
        ))}
    </div>
  )
}

export default PokemonDetails