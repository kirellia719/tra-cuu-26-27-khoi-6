import { useState, useEffect, useMemo, useCallback } from 'react';
import { candidateService } from '../../services/candidateService';
import SearchFilters from './SearchFilters';
import CandidateTable from './CandidateTable';
import Pagination from './Pagination';
import AddCandidateModal from './AddCandidateModal';
import UploadExcelModal from './UploadExcelModal';

const AdminDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // --- 1. Hàm lấy dữ liệu (Tách riêng để tái sử dụng) ---
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await candidateService.getAll();
      setCandidates(data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách thí sinh:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- 2. Xử lý logic Filter & Search ---
  const filteredData = useMemo(() => {
    return candidates.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sbd.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.cccd.includes(searchTerm)
    );
  }, [candidates, searchTerm]);

  // --- 3. Phân trang ---
  const currentTableData = useMemo(() => {
    if (rowsPerPage === "all") {
      return filteredData;
    }
    if (rowsPerPage >= filteredData.length && rowsPerPage !== 0) {
      return filteredData;
    }
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  // Reset trang về 1 khi tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="p-4 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-[1440px] mx-auto space-y-6">

        {/* Thanh công cụ: Tìm kiếm, Bộ lọc, Nút thêm/upload */}
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          setCurrentPage={setCurrentPage}
          totalItems={filteredData.length}
          onOpenModal={() => setIsAddModalOpen(true)}
          onUploadClick={() => setIsUploadModalOpen(true)}
        />

        {/* Modal thêm thủ công từng thí sinh */}
        <AddCandidateModal
          isOpen={isAddModalOpen}
          onCancel={() => setIsAddModalOpen(false)}
          onSuccess={fetchData} // Tải lại bảng khi thêm thành công
        />

        {/* Modal Upload Excel (Tươi mới, nhẹ nhàng) */}
        <UploadExcelModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onUploadSuccess={fetchData} // Tải lại bảng khi upload thành công
        />

        {/* Bảng hiển thị chính */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
          <CandidateTable
            data={currentTableData}
            startIndex={(currentPage - 1) * rowsPerPage}
            isLoading={isLoading}
            onRefresh={fetchData} // Truyền vào để table có thể gọi khi cần (ví dụ sau khi xóa)
          />
        </div>

        {/* Thanh phân trang */}
        <div className="pb-8">
          <Pagination
            totalItems={filteredData.length}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;