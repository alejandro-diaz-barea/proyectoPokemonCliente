import React from 'react'

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#FF0000', padding: '1rem', borderRadius: '0 0 10px 10px' }}>
      <p style={{ color: '#FFFFFF', textAlign: 'center' }}>
        &copy; {new Date().getFullYear()} Pokemon Data - Todos los derechos reservados.
      </p>
    </footer>
  )
}

export default Footer