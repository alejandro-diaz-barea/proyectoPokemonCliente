import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';

const Favoritos = () => {
  const { user } = useContext(UserContext);

  // Obtener la lista de favoritos del usuario
  const favoritos = user?.favoritos || [];

  return (
    <div>
      <h2>Tus Pokémon Favoritos</h2>
      {favoritos.length > 0 ? (
        <ul>
          {favoritos.map((favorito, index) => (
            <li key={index}>{favorito.name}</li>
          ))}
        </ul>
      ) : (
        <p>No tienes Pokémon en tus favoritos.</p>
      )}
    </div>
  );
};

export default Favoritos;
