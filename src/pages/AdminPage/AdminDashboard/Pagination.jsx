import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ totalItems, rowsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = rowsPerPage === "all" ? 1 : Math.ceil(totalItems / rowsPerPage);
  const startIndex = rowsPerPage === "all" ? 0 : (currentPage - 1) * rowsPerPage;
  const endIndex = rowsPerPage === "all" ? totalItems : Math.min(startIndex + rowsPerPage, totalItems);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const range = 1;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - range && i <= currentPage + range)) {
        pages.push(
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`w-9 h-9 rounded-xl text-[13px] font-bold transition-all border ${currentPage === i
              ? 'bg-[#366dc9] text-white border-[#366dc9] shadow-md shadow-blue-100'
              : 'text-slate-500 bg-white border-slate-200 hover:border-blue-300 hover:text-blue-600'
              }`}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - range - 1 || i === currentPage + range + 1) {
        pages.push(<span key={i} className="px-1 text-slate-300 font-bold">...</span>);
      }
    }
    return pages;
  };

  if (totalItems === 0) return null;

  return (
    <div className="px-6 py-4 bg-white border-t border-slate-50 grid grid-cols-1 md:grid-cols-3 items-center gap-4">

      {/* CỘT 1 (TRÁI): Hiển thị số lượng */}
      <div className="text-[13px] font-medium text-slate-400 text-center md:text-left">
        Hiển thị <span className="text-slate-800 font-bold">{startIndex + 1}</span> đến <span className="text-slate-800 font-bold">{endIndex}</span> trong tổng số <span className="text-slate-800 font-bold">{totalItems.toLocaleString()}</span>
      </div>

      {/* CỘT 2 (GIỮA): Cụm điều hướng trang */}
      <div className="flex items-center justify-center gap-1.5">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-1">
          {renderPageNumbers()}
        </div>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* CỘT 3 (PHẢI): Để trống để giữ cột giữa cân bằng */}
      <div className="hidden md:block"></div>

    </div>
  );
};

export default Pagination;