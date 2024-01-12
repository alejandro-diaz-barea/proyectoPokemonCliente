import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>¡Error 404!</h1>
      <p>Lo siento, no pudimos encontrar la página que estás buscando.</p>
      <p>¡Parece que este Pokémon se escapó!</p>
      <img
        src="https://example.com/path-to-your-pokemon-image.jpg"
        alt="Pokémon Lost"
        className="pokemon-image"
      />
    </div>
  );
};

export default NotFound;
