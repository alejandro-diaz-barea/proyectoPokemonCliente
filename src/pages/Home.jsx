import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import AddToFavorites from '../components/AddToFavorites';
import Buscador from '../components/Buscador';

const Home = () => {
  const [pokemones, setPokemones] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/type');
      if (response.ok) {
        const data = await response.json();
        setTypes(data.results);
      }
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    const getPokemones = async () => {
      let url;
      let totalResults;

      if (selectedType === '') {
        url = `https://pokeapi.co/api/v2/pokemon?offset=${(currentPage - 1) * 20}&limit=20`;
        const data = await fetch(url).then((res) => res.json());
        totalResults = data.count;
        setTotalPages(Math.ceil(totalResults / 20));
        setPokemones(
          await Promise.all(
            data.results.map(async (pokemon) => {
              const pokeResponse = await fetch(pokemon.url);
              const poke = await pokeResponse.json();
              return {
                id: poke.id,
                name: poke.name,
                img: poke.sprites.other.dream_world.front_default,
              };
            })
          )
        );
      } else {
        url = `https://pokeapi.co/api/v2/type/${selectedType}`;
        const typeData = await fetch(url).then((res) => res.json());
        const pokemonList = typeData.pokemon.slice((currentPage - 1) * 20, currentPage * 20);
        totalResults = typeData.pokemon.length;
        setTotalPages(Math.ceil(totalResults / 20));
        setPokemones(
          await Promise.all(
            pokemonList.map(async (poke) => {
              const pokeResponse = await fetch(poke.pokemon.url);
              const pokeDetails = await pokeResponse.json();
              return {
                id: pokeDetails.id,
                name: pokeDetails.name,
                img: pokeDetails.sprites.other.dream_world.front_default,
              };
            })
          )
        );
      }
    };

    getPokemones();
  }, [currentPage, selectedType]);

  useEffect(() => {
    // Lógica de búsqueda basada en el término de búsqueda
    const results = pokemones.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, pokemones]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setCurrentPage(1);
  };

  const handlePokemonClick = (pokemonName) => {
    navigate(`/detalles-pokemon/${pokemonName}`);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="pokemon-container">
      <h1 className="title">Pokemones</h1>
      <div>
        <Buscador onSearch={handleSearch} />

        <label htmlFor="typeSelect">Filtrar por tipo: </label>
        <select id="typeSelect" onChange={handleTypeChange} value={selectedType}>
          <option value="">Todos</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        <br />
        <br />
        <br />
        <br />
      </div>
      <div className="cards-container">
        {searchTerm !== '' ? (
          // Muestra los resultados de la búsqueda si hay un término de búsqueda
          searchResults.map((pokemon) => (
            <div
              className="pokemon-card"
              key={pokemon.id}
              onClick={() => handlePokemonClick(pokemon.name)}
            >
              <img src={pokemon.img} alt={pokemon.name} />
              <div className="card-details">
                <p className="pokemon-name">{pokemon.name}</p>
                <AddToFavorites pokemonName={pokemon.name} />
              </div>
            </div>
          ))
        ) : (
          // Muestra todos los pokemones si no hay término de búsqueda
          pokemones.map((pokemon) => (
            <div
              className="pokemon-card"
              key={pokemon.id}
              onClick={() => handlePokemonClick(pokemon.name)}
            >
              <img src={pokemon.img} alt={pokemon.name} />
              <div className="card-details">
                <p className="pokemon-name">{pokemon.name}</p>
                <AddToFavorites pokemonName={pokemon.name} />
              </div>
            </div>
          ))
        )}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Home;
