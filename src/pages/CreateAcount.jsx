import { useState } from 'react'
import '../assets/css/pages/CreateAccount.css'
import { useNavigate } from 'react-router-dom'

const CreateAccount = () => {
  const initialFormData = {
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const [formData, setFormData] = useState(initialFormData)
  const [formErrors, setFormErrors] = useState({})
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    setFormErrors({
      ...formErrors,
      [name]: ''
    })
  }

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }

  // Manejar el evento de blur para validar los campos
  const handleBlur = (e) => {
    const { name, value } = e.target
    const newErrors = { ...formErrors }

    switch (name) {
      case 'nombre':
        newErrors[name] = value.trim() === '' ? 'El nombre es obligatorio' : ''
        break
      case 'email':
        newErrors[name] = value.trim() === '' ? 'El correo electrónico es obligatorio' : ''
        if (value.trim() !== '' && !validateEmail(value)) {
          newErrors[name] = 'Ingrese un correo electrónico válido'
        }
        break
      case 'password':
        newErrors[name] = value.trim() === '' ? 'La contraseña es obligatoria' : ''
        if (value.trim() !== '' && value.length < 7) {
          newErrors[name] = 'La contraseña debe tener al menos 7 caracteres'
        }
        break
      case 'confirmPassword':
        newErrors[name] = value.trim() === '' ? 'Debe repetir la contraseña' : ''
        if (value !== formData.password) {
          newErrors[name] = 'Las contraseñas no coinciden'
        }
        break
      default:
        break
    }

    setFormErrors(newErrors)
  }

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}

    // Validar los campos del formulario
    Object.keys(formData).forEach((key) => {
      const value = formData[key]
      switch (key) {
        case 'nombre':
          if (value.trim() === '') {
            newErrors[key] = 'El nombre es obligatorio'
          }
          break
        case 'email':
          if (value.trim() === '') {
            newErrors[key] = 'El correo electrónico es obligatorio'
          } else if (!validateEmail(value)) {
            newErrors[key] = 'Ingrese un correo electrónico válido'
          }
          break
        case 'password':
          if (value.trim() === '') {
            newErrors[key] = 'La contraseña es obligatoria'
          } else if (value.trim().length < 7) {
            newErrors[key] = 'La contraseña debe tener al menos 7 caracteres'
          }
          break
        case 'confirmPassword':
          if (value.trim() === '') {
            newErrors[key] = 'Debe repetir la contraseña'
          } else if (value !== formData.password) {
            newErrors[key] = 'Las contraseñas no coinciden'
          }
          break
        default:
          break
      }
    })

    setFormErrors(newErrors)

    // Si no hay errores se procesa el formulario
    if (Object.keys(newErrors).length === 0) {
      const existingClientes = JSON.parse(localStorage.getItem('clientes')) || []
      const existingCliente = existingClientes.find(cliente => cliente.email === formData.email)

      if (existingCliente) {
        newErrors.email = 'El correo electrónico ya está registrado para otro cliente. Usa otro correo electrónico.'
        setFormErrors(newErrors)
      } else {
        // Establecer la foto predeterminada aquí
        const pikachuPhoto = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10080.png'
        const cliente = {
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
          favoritos: [],
          pikachuPhoto
        }

        // Guardar cliente en localStorage
        const updatedClientes = [...existingClientes, cliente]
        localStorage.setItem('clientes', JSON.stringify(updatedClientes))

        console.log('Cliente añadido a localStorage')

        // Mostrar el mensaje de éxito durante 3 segundos y redirigir
        setShowSuccessMessage(true)
        setTimeout(() => {
          setShowSuccessMessage(false)
          navigate('/iniciar-sesion')
        }, 3000)

        setFormData(initialFormData)
      }
    }
  }

  return (
    <section className="create-account-container">
      <h2 className="create-account-title">Crear Cuenta</h2>
      {showSuccessMessage && (
        <p className="success-message">Cuenta creada. Redirigiendo al inicio de sesión...</p>
      )}
      <form className="create-account-form" id="formulario" onSubmit={handleSubmit}>
        <label htmlFor="nombre" className="create-account-label">
          Nombre:
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            className="create-account-input"
            required
          />
          {formErrors.nombre && (
            <p className="error-message">{formErrors.nombre}</p>
          )}
        </label>
        <label htmlFor="email" className="create-account-label">
          Correo electrónico:
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="create-account-input"
            required
          />
          {formErrors.email && (
            <p className="error-message">{formErrors.email}</p>
          )}
        </label>
        <label htmlFor="password" className="create-account-label">
          Contraseña:
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="create-account-input"
            required
          />
          {formErrors.password && (
            <p className="error-message">{formErrors.password}</p>
          )}
        </label>
        <label htmlFor="confirmPassword" className="create-account-label">
          Repetir Contraseña:
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className="create-account-input"
            required
          />
          {formErrors.confirmPassword && (
            <p className="error-message">{formErrors.confirmPassword}</p>
          )}
        </label>
        <button type="submit" className="formButton create-account-button">
          Crear Cuenta
        </button>
      </form>
    </section>
  )
}

export default CreateAccount
