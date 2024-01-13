import React from 'react';

const Contacto = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contáctanos</h1>
      <form className="contact-form">
        <label htmlFor="name" className="contact-label">Nombre:</label>
        <input type="text" id="name" name="name" className="contact-input" required/>

        <label htmlFor="email" className="contact-label">Correo electrónico:</label>
        <input type="email" id="email" name="email" className="contact-input" required/>

        <label htmlFor="rating" className="contact-label">Valora nuestra página:</label>
        <input type="number" id="rating" name="rating" className="contact-rating" min="1" max="5" step="1" required/>

        <label htmlFor="message" className="contact-label">Mensaje:</label>
        <textarea id="message" name="message" className="contact-message" rows="4" cols="50" required></textarea>

        <button type="submit" className="contact-button">Enviar</button>
      </form>
    </div>
  );
}

export default Contacto;
