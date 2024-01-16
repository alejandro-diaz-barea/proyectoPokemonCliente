import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import logo from '../assets/img/logo.png'
import '../assets/css/components/Navbar.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  //Funcion para ir a home cuando pinchas en el logo
  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <main>
      <header className={`header-container`}>
        <div className="header-content">
          <img src={logo} alt='Logo' className='logo' onClick={handleLogoClick}/>
          <NavLink to="/contacto">Contáctanos</NavLink>


          {user ? (
            <>
              {/* Si el usuario esta logeado le sale esto */}
              <NavLink to="/favoritos">Favoritos</NavLink>
              <NavLink to="/perfil">
                <div className='card-profile'>
                  <img
                    src={user.pikachuPhoto}
                    alt="fotoPerfil"
                    className="profile-image"
                  />
                  <p>{user.nombre}</p>
                </div>
              </NavLink>
            </>
          ) : (
            <>
              {/* Si no esta logeado hace esto  */}
              <NavLink to="/crear-cuenta">Crear cuenta</NavLink>
              <NavLink to="/iniciar-sesion">Login</NavLink>
            </>
          )}
        </div>
      </header>
    </main>
  )
}

export default Navbar
