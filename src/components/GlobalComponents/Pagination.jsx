import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1,);

  return (
    <div className="flex items-center justify-center gap-2 mb-[100px]">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-[45px] h-[45px] ${
            currentPage === page ? 'bg-black text-white' : 'border text-[#222222]'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
