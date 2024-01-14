import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import AddToFavorites from '../components/AddToFavorites';
import Buscador from '../components/Buscador';
import Pagination from '../components/Pagination';

const Home = () => {
  const [pokemones, setPokemones] = useState([]);
  const [notFoundMessage, setNotFoundMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePokemonClick = (pokemonName) => {
    navigate(`/detalles-pokemon/${pokemonName}`);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    const getPokemones = async () => {
      try {
        const offset = (currentPage - 1) * 20;
        const url = searchTerm
          ? `https://pokeapi.co/api/v2/pokemon?offset=0&limit=9999`
          : `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const results = data.results || [];

        const newPokemones = await Promise.all(
          results.map(async (pokemon) => {
            const pokeResponse = await fetch(pokemon.url);
            const poke = await pokeResponse.json();

            return {
              id: poke.id,
              name: poke.name,
              img: poke.sprites.other.dream_world.front_default,
            };
          })
        );

        if (searchTerm) {
          const searchResults = newPokemones.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setTotalPages(Math.ceil(searchResults.length / 20));
          setPokemones(searchResults.slice(offset, offset + 20));
        } else {
          setTotalPages(Math.ceil(data.count / 20));
          setPokemones(newPokemones);
        }

        setNotFoundMessage('');
      } catch (error) {
        console.error('Error al obtener Pokémon:', error);
        setPokemones([]);
        setNotFoundMessage('No se encontraron Pokémon.');
      }
    };

    getPokemones();
  }, [currentPage, searchTerm]);

  return (
    <div className="pokemon-container">
      <h1 className="title">Pokemones</h1>
      <div>
        <Buscador onSearch={handleSearch} />
      </div>
      <div className="cards-container">
        {notFoundMessage ? (
          <p>{notFoundMessage}</p>
        ) : (
          pokemones.map((pokemon) => (
            <div
              className="pokemon-card"
              key={pokemon.name}
              onClick={() => handlePokemonClick(pokemon.name)}
            >
              <img
                src={pokemon.img}
                alt={pokemon.name}
              />
              <div className="card-details">
                <p className="pokemon-name">{pokemon.name}</p>
                <AddToFavorites pokemonName={pokemon.name} />
              </div>
            </div>
          ))
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      )}
    </div>
  );
};

export default Home;
