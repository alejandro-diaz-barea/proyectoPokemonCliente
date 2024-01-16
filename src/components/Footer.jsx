import '../assets/css/components/Footer.css'


const Footer = () => {
  return (
    <footer className="footer-container">
      <p className="footer-text">
        &copy; {new Date().getFullYear()} Pokemon Data - Todos los derechos reservados.
      </p>
    </footer>
  )
}

export default Footer
