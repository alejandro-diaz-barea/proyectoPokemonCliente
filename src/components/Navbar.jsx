import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import './Navbar.css';

const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <main>
      <header className={`header-container ${user ? 'logged-in' : 'logged-out'}`}>
        <div className="header-content">
          <h1 className="tituloWeb">POKÉMON DATA</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/contacto">Contáctanos</NavLink>
          {user ? (
            <>
              <NavLink to="/favoritos">Favoritos</NavLink>
              <NavLink to="/perfil">
                <div className='card-profile'>
                  <img
                    src={user.pikachuPhoto}
                    alt="fotoPerfil"
                  />
                  <p>{user.nombre}</p>
                  <div className="dropdown-content">
¡                  </div>
                </div>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/crear-cuenta">Crear cuenta</NavLink>
              <NavLink to="/iniciar-sesion">Login</NavLink>
            </>
          )}
        </div>
      </header>
    </main>
  );
};

export default Navbar;
