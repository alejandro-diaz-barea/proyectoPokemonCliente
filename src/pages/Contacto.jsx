import React, { useState } from 'react'
import '../assets/css/pages/Contacto.css'


const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Función para manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Limpiar errores al cambiar el valor
    setFormErrors({
      ...formErrors,
      [e.target.name]: '',
    });

    // Resetear el mensaje de enviado cuando se realiza un cambio
    setIsFormSubmitted(false);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos
    const newErrors = {};

    if (formData.name.trim() === '') {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (formData.email.trim() === '') {
      newErrors.email = 'El correo electrónico es obligatorio';
    }

    // Validación para el campo de Valoración (rating)
    if (formData.rating.trim() === '') {
      newErrors.rating = 'La valoración es obligatoria';
    } else {
      const ratingValue = parseInt(formData.rating, 10);
      if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 10) {
        newErrors.rating = 'La valoración debe estar entre 1 y 10';
      }
    }

    if (formData.message.trim() === '') {
      newErrors.message = 'El mensaje es obligatorio';
    }

    // Actualizar los errores del formulario
    setFormErrors(newErrors);

    // Si no hay errores, puedes enviar el formulario
    if (Object.keys(newErrors).length === 0) {
      // Realiza la lógica de envío del formulario aquí
      console.log('Formulario enviado:', formData);

      // Mostrar el mensaje de enviado y resetear el formulario
      setIsFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        rating: '',
        message: '',
      });
    }
  };

  return (
    <div className="contact-container">
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
          value={formData.rating}
          onChange={handleChange}
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
          required
        ></textarea>
        {formErrors.message && (
          <p className="error-message">{formErrors.message}</p>
        )}

        <button type="submit" className="contact-button">
          Enviar
        </button>

        {isFormSubmitted && (
          <p className="success-message">¡Formulario enviado con éxito!</p>
        )}
      </form>
    </div>
  );
};

export default Contacto;
