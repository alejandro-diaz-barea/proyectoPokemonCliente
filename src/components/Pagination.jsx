import React from 'react';

const Pagination = ({ currentPage, totalPages, onPrevPage, onNextPage }) => {
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  const handlePrevPage = () => {
    if (!isPrevDisabled) {
      onPrevPage();
    }
  };

  const handleNextPage = () => {
    if (!isNextDisabled) {
      onNextPage();
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={isPrevDisabled}>
        Anterior
      </button>
      <span>{`${currentPage}/${totalPages}`}</span>
      <button onClick={handleNextPage} disabled={isNextDisabled}>
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
