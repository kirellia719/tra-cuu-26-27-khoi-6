import { Select } from 'antd'; // Import Select từ antd
import { Search, Plus, Upload } from 'lucide-react';

const SearchFilters = ({ searchTerm, setSearchTerm, rowsPerPage, setRowsPerPage, setCurrentPage, onOpenModal, onUploadClick }) => {
  return (
    <div className="bg-white p-3 sm:p-5 rounded-lg shadow-sm border border-slate-100 mb-4 sm:mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">

        {/* NHÓM 1: SEARCH & ANTD SELECT (Luôn 1 hàng, Full width trên Mobile) */}
        <div className="flex flex-row items-center gap-2 w-full lg:w-auto">

          {/* Ô Tìm kiếm: Chiếm 70% chiều ngang mobile */}
          <div className="flex-[3] relative group">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#366dc9] z-10" />
            <input
              type="text"
              placeholder="Tìm tên, SBD..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-[7px] bg-slate-50 border border-slate-200 rounded-xl text-[12px] sm:text-[13px] outline-none focus:border-[#366dc9] focus:ring-4 focus:ring-blue-500/5 transition-all"
            />
          </div>

          {/* Ant Design Select: Chiếm 30% chiều ngang mobile */}
          <div className="flex-1 min-w-[100px] sm:w-32 lg:w-36">
            <Select
              value={rowsPerPage}
              onChange={(value) => {
                setRowsPerPage(value);
                setCurrentPage(1);
              }}
              className="w-full custom-antd-select"
              variant="filled" // Style hiện đại, tệp màu với background slate
              options={[
                { value: 5, label: '5 dòng' },
                { value: 10, label: '10 dòng' },
                { value: 20, label: '20 dòng' },
                { value: 50, label: '50 dòng' },
                { value: "all", label: 'Tất cả' },
              ]}
            />
          </div>
        </div>

        {/* NHÓM 2: NÚT HÀNH ĐỘNG */}
        <div className="flex flex-row items-center gap-2 w-full lg:w-auto">
          <button
            onClick={onUploadClick}
            className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-[12px] sm:text-[13px] font-bold hover:bg-emerald-100 transition-all cursor-pointer"
          >
            <Upload size={14} />
            <span className="whitespace-nowrap">Nhập Excel</span>
          </button>

          <button
            onClick={onOpenModal}
            className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-[#366dc9] text-white rounded-xl text-[12px] sm:text-[13px] font-bold shadow-md hover:bg-blue-700 transition-all cursor-pointer"
          >
            <Plus size={14} />
            <span className="whitespace-nowrap">Thêm mới</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default SearchFilters;