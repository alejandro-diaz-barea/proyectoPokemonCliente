import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/pages/Home.css';
import Buscador from '../components/Buscador';
import Pagination from '../components/Pagination';
import FilterOptions from '../components/FilterOptions';
import PokemonCard from '../components/PokemonCard';
import { UserContext } from '../context/userContext';

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [pokemones, setPokemones] = useState([]);
  const [notFoundMessage, setNotFoundMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({ type: '' });
  const [searchPage, setSearchPage] = useState(1); // Página para la búsqueda

  // Función para ir a la siguiente página
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      setSearchPage(1); // Reinicia la página de búsqueda al cambiar de página
    }
  };

  // Función para ir a la página anterior
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      setSearchPage(1); // Reinicia la página de búsqueda al cambiar de página
    }
  };

  // Función para cambiar la página de búsqueda
  const handleSearchPageChange = (page) => {
    setSearchPage(page);
  };

  const handlePokemonClick = (pokemonName) => {
    if (!user) {
      navigate('/iniciar-sesion');
    } else {
      navigate(`/detalles-pokemon/${pokemonName}`);
    }
  };

  // Función para realizar una búsqueda de Pokémon
  const handleSearch = (term) => {
    setSearchTerm(term);
    setSearchPage(1); // Reiniciar la página de búsqueda al realizar una búsqueda
  };

  // Función para cambiar el filtro de tipo de Pokémon
  const handleFilterChange = (selectedType) => {
    setSelectedFilters({ type: selectedType });
    setCurrentPage(1); // Establecer la página actual a 1 al aplicar un filtro
    setSearchPage(1); // Reiniciar la página de búsqueda al cambiar el filtro
  };

  // Función para obtener los Pokémon según los filtros y términos de búsqueda
  const getPokemones = async () => {
    try {
      const offset = (searchTerm ? (searchPage - 1) * 20 : (currentPage - 1) * 20);
      let baseurl = 'https://pokeapi.co/api/v2/pokemon';

      // Aplicar filtro por tipo a la URL si es necesario
      if (selectedFilters.type && !searchTerm) {
        const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${selectedFilters.type}`);
        const typeData = await typeResponse.json();
        const results = typeData.pokemon || [];

        const newPokemones = await Promise.all(
          results.slice(offset, offset + 20).map(async (pokemonEntry) => {
            const pokemonUrl = pokemonEntry.pokemon.url;
            const pokeResponse = await fetch(pokemonUrl);
            const poke = await pokeResponse.json();

            return {
              id: poke.id,
              name: poke.name,
              img: poke.sprites.other.dream_world.front_default,
              types: poke.types.map((type) => type.type.name),
            };
          })
        );

        setTotalPages(Math.ceil(results.length / 20));
        setPokemones(newPokemones);
      } else {
        // Obtener la cantidad total de Pokémon solo cuando no hay término de búsqueda
        if (!searchTerm) {
          const totalPokemonsResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
          const totalPokemonsData = await totalPokemonsResponse.json();
          const totalPokemonsCount = totalPokemonsData.count;
          setTotalPages(Math.ceil(totalPokemonsCount / 20));
        }

        const searchUrl = `${baseurl}?offset=0&limit=1000`;
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();
        const searchResults = searchData.results || [];
        const filteredResults = searchResults.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const newPokemones = await Promise.all(
          filteredResults.slice(offset, offset + 20).map(async (pokemon) => {
            const pokeResponse = await fetch(pokemon.url);
            const poke = await pokeResponse.json();

            // Verificar si no hay filtro de tipo o si coincide con el filtro
            if (!selectedFilters.type || poke.types.some((type) => type.type.name === selectedFilters.type)) {
              return {
                id: poke.id,
                name: poke.name,
                img: poke.sprites.other.dream_world.front_default,
                types: poke.types.map((type) => type.type.name),
              };
            } else {
              return null;
            }
          })
        );

        const filteredPokemones = newPokemones.filter((pokemon) => pokemon !== null);
        setPokemones(filteredPokemones);

        // Mostrar mensaje si no se encontraron Pokémon después de aplicar el filtro o búsqueda
        if (filteredPokemones.length === 0) {
          setNotFoundMessage('¡Pokemon no encontrado!');
        } else {
          setNotFoundMessage('');
        }
      }
    } catch (error) {
      console.error('Error al obtener Pokémon:', error);
      setPokemones([]);
      setTotalPages(0);
      setNotFoundMessage('No se encontraron Pokémon.');
    }
  };

  useEffect(() => {
    getPokemones();
  }, [currentPage, searchTerm, selectedFilters.type, searchPage]);

  return (
    <div className="pokemon-container">
      <h1 className="title">Pokemones</h1>
      <div>
        <Buscador onSearch={handleSearch} />
        <FilterOptions onFilterChange={handleFilterChange} />
      </div>
      <div className="cards-container">
        {notFoundMessage ? (
            <div className="not-found-message">{notFoundMessage}</div>

        ) : (
          pokemones.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              pokemon={pokemon}
              onClick={() => handlePokemonClick(pokemon.name)}
            />
          ))
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={searchTerm ? searchPage : currentPage}
          totalPages={searchTerm ? Math.ceil(pokemones.length / 20) : totalPages}
          onPrevPage={searchTerm ? () => handleSearchPageChange(searchPage - 1) : handlePrevPage}
          onNextPage={searchTerm ? () => handleSearchPageChange(searchPage + 1) : handleNextPage}
        />
      )}
    </div>
  );
};

export default Home;
