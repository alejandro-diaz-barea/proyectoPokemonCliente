import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import './Navbar.css';


const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate('/');
  };

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
              <div className='card-profile'>
                <p>{user.nombre}</p> {/*dice el nombre del usuario */}
                <div className="dropdown-content">
                  <NavLink to="/perfil">Perfil</NavLink>
                  <button onClick={cerrarSesion}>Cerrar sesión</button>
                </div>
              </div>
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