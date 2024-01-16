import { useEffect, useState } from 'react'

const FilterOptions = ({ onFilterChange }) => {
  // Estado para almacenar los tipos de Pokémon
  const [types, setTypes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const typeResponse = await fetch('https://pokeapi.co/api/v2/type')
        const typeData = await typeResponse.json()
        setTypes(typeData.results);
      } catch (error) {
        console.error('Error fetching the types:', error)
      }
    };

    fetchData()
  }, [])

  return (
    <div className="filter-options">
    
      <label htmlFor="type">Tipo Primario:</label>
      <select
        id="type"
        onChange={(e) => onFilterChange(e.target.value, '', '')}
      >
        <option value="">Selecciona un tipo</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>

    </div>
  )
}

export default FilterOptions;
