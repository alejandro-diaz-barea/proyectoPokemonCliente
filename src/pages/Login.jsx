import { useState, useContext } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import '../assets/css/pages/login.css'

const Login = () => {
  const initialLoginData = {
    email: '',
    password: ''
  }

  const [loginData, setLoginData] = useState(initialLoginData)
  const [errors, setErrors] = useState({})
  const { login } = useContext(UserContext)
    const navigate = useNavigate()

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })

    setErrors({
      ...errors,
      [e.target.name]: ''
    })
  }

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    const newErrors = { ...errors }

    switch (name) {
      case 'email':
        newErrors[name] = value.trim() === '' ? 'El correo electrónico es obligatorio' : ''
        if (value.trim() !== '' && !validateEmail(value)) {
          newErrors[name] = 'Ingrese un correo electrónico válido'
        }
        break
      case 'password':
        newErrors[name] = value.trim() === '' ? 'La contraseña es obligatoria' : ''
        break
      default:
        break
    }

    setErrors(newErrors)
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}

    // Validación de correo electrónico
    if (loginData.email.trim() === '') {
      newErrors.email = 'El correo electrónico es obligatorio'
    } else if (!validateEmail(loginData.email)) {
      newErrors.email = 'Ingrese un correo electrónico válido'
    }

    // Validación de contraseña
    if (loginData.password.trim() === '') {
      newErrors.password = 'La contraseña es obligatoria'
    }

    setErrors(newErrors)

    // Si no hay errores, proceder con el inicio de sesión
    if (Object.keys(newErrors).length === 0) {
      const existingClientes = JSON.parse(localStorage.getItem('clientes')) || []
      const existingCliente = existingClientes.find(
        (cliente) => cliente.email === loginData.email && cliente.password === loginData.password
      )

      // Comprobar si el cliente existe y realizar el inicio de sesión
      if (existingCliente) {
        console.log('Inicio de sesión exitoso')
        login(existingCliente)
        navigate('/')
      } else {
        // Mostrar error si las credenciales son incorrectas
        setErrors({ general: 'El usuario o la contraseña es incorrecto' })
      }
    }
  }

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="input-field"
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="input-field"
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </label>
        {errors.general && <p className="error-message">{errors.general}</p>}
        <div className="button-container">
          <button type="submit" className="formButton">
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
