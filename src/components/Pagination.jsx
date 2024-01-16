
const Pagination = ({ currentPage, totalPages, onPrevPage, onNextPage }) => {
  // Determina si el botón de retroceso debería estar deshabilitado
  const isPrevDisabled = currentPage === 1

  // Determina si el botón de avance debería estar deshabilitado
  const isNextDisabled = currentPage === totalPages

  // Maneja el retroceso de página
  const handlePrevPage = () => {
    if (!isPrevDisabled) {
      onPrevPage()
    }
  }

  // Maneja el avance de página
  const handleNextPage = () => {
    if (!isNextDisabled) {
      onNextPage()
    }
  }

  // Renderiza la paginación si hay más de una página
  return (
    totalPages > 1 && (
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={isPrevDisabled}>
          Anterior
        </button>
        <span>{`${currentPage}/${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={isNextDisabled}>
          Siguiente
        </button>
      </div>
    )
  )
}

export default Pagination
