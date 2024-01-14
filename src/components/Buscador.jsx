import React, { useState, useEffect } from 'react';

const Buscador = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
  );
};

export default Buscador;
