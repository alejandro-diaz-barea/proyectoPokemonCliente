import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import AddToFavorites from '../components/AddToFavorites';
import Buscador from '../components/Buscador';

const Home = () => {
  const [pokemones, setPokemones] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [notFoundMessage, setNotFoundMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const getPokemones = async (url) => {
      try {
        const data = await fetch(url).then((res) => res.json());

        if (!data.results || data.results.length === 0) {
          setPokemones([]);
          setNotFoundMessage('No se encontraron Pokémon.');
          return;
        }

        const totalResults = data.count;
        setTotalPages(Math.ceil(totalResults / 20));

        setPokemones(
          data.results.map((pokemon) => {
            const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];

            return {
              id: pokemonId,
              name: pokemon.name,
              img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
            };
          })
        );

        setNotFoundMessage('');
      } catch (error) {
        console.error('Error al obtener Pokémon:', error);
      }
    };

    if (searchTerm !== '') {
      getPokemones(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=9999`);
    }
  }, [searchTerm]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePokemonClick = (pokemonName) => {
    navigate(`/detalles-pokemon/${pokemonName}`);
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    setCurrentPage(1);

    if (term !== '') {
      try {
        const searchUrl = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=9999`;
        const searchData = await fetch(searchUrl).then((res) => res.json());

        const searchResults = searchData.results.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(term.toLowerCase())
        );

        if (!searchResults || searchResults.length === 0) {
          setPokemones([]);
          setNotFoundMessage('No se encontraron Pokémon.');
          return;
        }

        const totalResults = searchResults.length;
        setTotalPages(Math.ceil(totalResults / 20));

        const startIndex = (currentPage - 1) * 20;
        const endIndex = startIndex + 20;
        const paginatedResults = searchResults.slice(startIndex, endIndex);

        setPokemones(
          paginatedResults.map((pokemon) => {
            const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];

            return {
              id: pokemonId,
              name: pokemon.name,
              img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
            };
          })
        );

        setNotFoundMessage('');
      } catch (error) {
        console.error('Error al obtener Pokémon para la búsqueda:', error);
      }
    }
  };

  useEffect(() => {
    const getPokemonesPage = async () => {
      try {
        let url;

        if (searchTerm === '') {
          url = `https://pokeapi.co/api/v2/pokemon?offset=${(currentPage - 1) * 20}&limit=20`;
        } else {
          url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=9999`;
        }

        const data = await fetch(url).then((res) => res.json());

        if (!data.results || data.results.length === 0) {
          setPokemones([]);
          setNotFoundMessage('No se encontraron Pokémon.');
          return;
        }

        setPokemones(
          data.results.map((pokemon) => {
            const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];

            return {
              id: pokemonId,
              name: pokemon.name,
              img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
            };
          })
        );

        setNotFoundMessage('');
      } catch (error) {
        console.error('Error al obtener Pokémon:', error);
      }
    };

    getPokemonesPage();
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
      {searchTerm !== '' && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Anterior
          </button>
          <span>Página {currentPage}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
