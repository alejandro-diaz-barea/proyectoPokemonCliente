import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const AddToFavorites = ({ pokemonName }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user) {
      setIsFavorite(user.favoritos.some((fav) => fav.name === pokemonName));
    }
  }, [user, pokemonName]);

  const handleToggleFavorites = (e) => {
    e.stopPropagation();

    if (user) {
      const existingClientes = JSON.parse(localStorage.getItem('clientes')) || [];
      const existingUserIndex = existingClientes.findIndex((c) => c.email === user.email);

      if (existingUserIndex !== -1) {
        const existingUser = existingClientes[existingUserIndex];
        const isCurrentlyFavorite = existingUser.favoritos.some((fav) => fav.name === pokemonName);

        let updatedFavoritos;

        if (isCurrentlyFavorite) {
          updatedFavoritos = existingUser.favoritos.filter((fav) => fav.name !== pokemonName);
        } else {
          updatedFavoritos = [...existingUser.favoritos, { name: pokemonName }];
        }

        const updatedUser = { ...existingUser, favoritos: updatedFavoritos };

        existingClientes[existingUserIndex] = updatedUser;
        localStorage.setItem('clientes', JSON.stringify(existingClientes));

        setUser(updatedUser);
        setIsFavorite(!isCurrentlyFavorite);
      } else {
        console.log('Usuario no encontrado en localStorage');
      }
    } else {
      navigate('/iniciar-sesion');
    }
  };

  return (
    <button onClick={handleToggleFavorites} className={`add-to-favorites-button ${isFavorite ? 'favorito' : ''}`}>
      {isFavorite ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}
    </button>
  );
};

export default AddToFavorites;
