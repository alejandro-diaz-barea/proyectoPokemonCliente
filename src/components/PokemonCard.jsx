
import AddToFavorites from './AddToFavorites';


const PokemonCard = ({ pokemon, onClick }) => {


  return (
    <div className="pokemon-card" onClick={onClick}>
      <img src={pokemon.img} alt={pokemon.name} />
      <div className="card-details">
        <h3 className="pokemon-name">{pokemon.name}</h3>
        <h4 className="pokemon-type">Type: {pokemon.types.join(', ')}</h4>
        
        <AddToFavorites pokemonName={pokemon.name} />
      </div>
    </div>
  );
};

export default PokemonCard;
