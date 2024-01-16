import { useState, useContext } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import '../assets/css/pages/login.css'

const Login = () => {
  // Estado para almacenar los datos de inicio de sesión
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  // Estado para manejar errores durante el inicio de sesión
  const [errors, setErrors] = useState({})

  const { login } = useContext(UserContext)
  const navigate = useNavigate()

  // Manejar el cambio en los campos de entrada
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })

    // Limpiar errores al cambiar el valor
    setErrors({
      ...errors,
      [e.target.name]: '',
    })
  }

  // Validar si el campo está vacío al perder el foco
  const validar = (e) => {
    if (e.target.value.trim() === '') {
      mostrarAlerta(`El campo ${e.target.name} es obligatorio`, e.target.parentElement)
    } else {
      limpiarAlerta(e.target.parentElement)
    }
  }

  // Limpiar alerta de error
  const limpiarAlerta = (referencia) => {
    const alerta = referencia.querySelector('.bg-red-600')
    if (alerta) {
      alerta.remove()
    }
  }

  // Mostrar alerta de error
  const mostrarAlerta = (mensaje, referencia) => {
    limpiarAlerta(referencia)

    const error = document.createElement('P')
    error.textContent = mensaje
    error.classList.add('bg-red-600', 'text-center', 'text-white', 'p-2')
    referencia.appendChild(error)
  }

  // Manejar el intento de inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault()

    // Verificar las credenciales en localStorage
    const existingClientes = JSON.parse(localStorage.getItem('clientes')) || []
    const existingCliente = existingClientes.find(
      (cliente) => cliente.email === loginData.email && cliente.password === loginData.password
    )

    if (existingCliente) {
      console.log('Inicio de sesión exitoso')
      login(existingCliente) // Almacena el cliente completo en el contexto
      navigate('/')
    } else {
      setErrors({ general: 'El usuario o la contraseña es incorrecto' })
    }
  }

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <label>
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            onBlur={validar}
            required
          />
          {errors.email && <p className="bg-red-600 text-center text-white p-2">{errors.email}</p>}
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
          {errors.password && (
            <p className="bg-red-600 text-center text-white p-2">{errors.password}</p>
          )}
        </label>
        {errors.general && (
          <p className="bg-red-600 text-center text-white p-2">{errors.general}</p>
        )}
        <button type="submit" className="formButton">
          Iniciar Sesión
        </button>
      </form>
    </div>
  )
}

export default Login
