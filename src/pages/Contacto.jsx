import { useState } from 'react'
import '../assets/css/pages/Contacto.css'

const Contacto = () => {
  const initialFormData = {
    name: '',
    email: '',
    rating: '',
    message: '',
    incidentDate: '',
  }

  const [formData, setFormData] = useState(initialFormData)
  const [formErrors, setFormErrors] = useState({})
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))

    // Limpiar error cuando se cambia el valor del campo
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }))

    // Marcar el formulario como no enviado
    setIsFormSubmitted(false)
  }

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }

  // Validar cuando salgan del campo
  const handleBlur = (e) => {
    const { name, value } = e.target
    const newErrors = { ...formErrors }

    switch (name) {
      case 'name':
        newErrors[name] = value.trim() === '' ? 'El nombre es obligatorio' : ''
        break
      case 'email':
        newErrors[name] = value.trim() === '' ? 'El correo electrónico es obligatorio' : ''
        if (value.trim() !== '' && !validateEmail(value)) {
          newErrors[name] = 'Ingrese un correo electrónico válido'
        }
        break
      case 'rating':
        newErrors[name] =
          value.trim() === '' || isNaN(value) || value < 1 || value > 10
            ? 'La valoración debe estar entre 1 y 10'
            : ''
        break
      case 'message':
        newErrors[name] = value.trim().length < 15 ? 'El mensaje debe tener al menos 15 caracteres' : ''
        break
      case 'incidentDate':
        newErrors[name] = value.trim() === '' ? 'La fecha de la incidencia es obligatoria' : ''
        break
      default:
        break
    }

    setFormErrors(newErrors)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}

    // Validar campos del formulario
    Object.keys(formData).forEach((key) => {
      const value = formData[key]
      switch (key) {
        case 'name':
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
        case 'rating':
          if (value.trim() === '') {
            newErrors[key] = 'La valoración es obligatoria'
          } else {
            const ratingValue = parseInt(value, 10)
            if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 10) {
              newErrors[key] = 'La valoración debe estar entre 1 y 10'
            }
          }
          break
        case 'message':
          if (value.trim().length < 15) {
            newErrors[key] = 'El mensaje debe tener al menos 15 caracteres'
          }
          break
        case 'incidentDate': 
          if (value.trim() === '') {
            newErrors[key] = 'La fecha de la incidencia es obligatoria'
          }
          break
        default:
          break
      }
    })

    setFormErrors(newErrors)

    // Enviar formulario si no hay errores
    if (Object.keys(newErrors).length === 0) {
      console.log('Formulario enviado:', formData)

      // Marcar el formulario como enviado y limpiar los campos
      setIsFormSubmitted(true)
      setFormData(initialFormData)
    }
  }

  return (
    <section className="contact-container">
      <h1 className="contact-title">Contáctanos</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="contact-label">
          Nombre:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="contact-input"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {formErrors.name && (
          <p className="error-message">{formErrors.name}</p>
        )}

        <label htmlFor="email" className="contact-label">
          Correo electrónico:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="contact-input"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {formErrors.email && (
          <p className="error-message">{formErrors.email}</p>
        )}

        <label htmlFor="rating" className="contact-label">
          Valora nuestra página del 1 al 10:
        </label>
        <input
          type="number"
          id="rating"
          name="rating"
          className="contact-input"
          value={formData.rating}
          onChange={handleChange}
          onBlur={handleBlur}
          min="1"
          max="10"
          required
        />
        {formErrors.rating && (
          <p className="error-message">{formErrors.rating}</p>
        )}

        <label htmlFor="message" className="contact-label">
          Mensaje:
        </label>
        <textarea
          id="message"
          name="message"
          className="contact-message"
          rows="4"
          cols="50"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        ></textarea>
        {formErrors.message && (
          <p className="error-message">{formErrors.message}</p>
        )}

        <label htmlFor="incidentDate" className="contact-label">
          Fecha de la incidencia:
        </label>
        <input
          type="date"
          id="incidentDate"
          name="incidentDate"
          className="contact-input"
          value={formData.incidentDate}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {formErrors.incidentDate && (
          <p className="error-message">{formErrors.incidentDate}</p>
        )}

        <button type="submit" className="contact-button">
          Enviar
        </button>

        {isFormSubmitted && (
          <p className="success-message">¡Formulario enviado con éxito!</p>
        )}
      </form>
    </section>
  )
}

export default Contacto
