import { useState, useEffect } from 'react'

const Buscador = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    //FUNCION QUE DEPENDE DEL TIEMPO
    //Esta funcion lo que hace es llamar a onSearch cuando pasan 1000 milisegundos de inactividad (he puesto bastante tiempo para que se note)
    const delayFunction = setTimeout(() => {
      onSearch(searchTerm);
    }, 1000)

    return () => clearTimeout(delayFunction)
  }, [searchTerm, onSearch])

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div>
      <label htmlFor="searchInput">Buscar Pokémon: </label>
      <input
        type="text"
        id="searchInput"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Escribe el nombre del Pokémon"
      />
    </div>
  )
}

export default Buscador
