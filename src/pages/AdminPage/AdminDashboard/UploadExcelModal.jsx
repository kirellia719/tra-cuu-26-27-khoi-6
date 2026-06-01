import { useState, useRef } from 'react';
import {
  CloudUpload, X, GraduationCap,
  ChevronRight, Trash2, FileCheck, Download, Loader2
} from 'lucide-react';

// Import các công cụ đã chuẩn bị
import { candidateService } from '../../services/candidateService';
import { downloadTemplate, readExcelFile } from '../../utils/excelUtils';

const UploadExcelModal = ({ isOpen, onClose, onUploadSuccess }) => {
  const [candidates, setCandidates] = useState([]);
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // 1. Xử lý đọc file và ánh xạ dữ liệu (Bổ sung Ngày sinh)
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      try {
        const rawData = await readExcelFile(file);
        const mappedData = rawData.map((item) => ({
          sbd: item["SBD"]?.toString() || "",
          name: item["Họ và tên"] || "",
          grade: parseInt(item["Khối lớp"]) || 6,
          dob: item["Ngày sinh"] || "",
          cccd: item["CCCD"]?.toString() || "",

          // Điểm gốc
          math: parseFloat(item["Toán"]) || 0,
          literature: parseFloat(item["Ngữ văn"]) || 0,
          english: parseFloat(item["Tiếng Anh"]) || 0,

          // Điểm phúc khảo
          mathReview:
            item["Toán phúc khảo"] !== undefined &&
              item["Toán phúc khảo"] !== ""
              ? parseFloat(item["Toán phúc khảo"])
              : null,

          literatureReview:
            item["Văn phúc khảo"] !== undefined &&
              item["Văn phúc khảo"] !== ""
              ? parseFloat(item["Văn phúc khảo"])
              : null,

          englishReview:
            item["Anh phúc khảo"] !== undefined &&
              item["Anh phúc khảo"] !== ""
              ? parseFloat(item["Anh phúc khảo"])
              : null,

          bonusPoint: parseFloat(item["Điểm khuyến khích"]) || 0,
        }));
        setCandidates(mappedData);
      } catch (err) {
        console.error("Error reading Excel file:", err);
        alert("Lỗi: Không thể đọc tệp Excel. Vui lòng kiểm tra định dạng!");
      }
    }
  };

  // 2. Gửi dữ liệu lên API /candidates
  const handleConfirmUpload = async () => {
    if (candidates.length === 0) return;
    setIsUploading(true);
    try {
      await candidateService.create(candidates);
      alert(`Thành công! Đã nhập ${candidates.length} thí sinh.`);
      if (onUploadSuccess) onUploadSuccess();
      handleClose();
    } catch (error) {
      alert(error.message || "Lỗi khi lưu dữ liệu!");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setCandidates([]);
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="w-full max-w-6xl bg-white rounded-[40px] shadow-2xl flex flex-col max-h-[95vh] border border-white overflow-hidden">

        {/* Header */}
        <div className="px-10 py-7 bg-gradient-to-r from-blue-600 to-indigo-500 text-white flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl">
              <GraduationCap size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Nhập Hồ Sơ Tuyển Sinh</h2>
              <p className="text-blue-100 text-xs font-semibold tracking-widest opacity-80 uppercase font-mono">Dữ liệu Ngày sinh & Điểm số</p>
            </div>
          </div>
          <button onClick={handleClose} disabled={isUploading} className="hover:bg-white/20 p-2 rounded-full transition-all text-white">
            <X size={24} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto bg-slate-50 flex-1 font-sans">
          {candidates.length === 0 ? (
            <div className="flex flex-col items-center py-12 animate-in fade-in zoom-in duration-300">
              <div
                onClick={() => !isUploading && fileInputRef.current.click()}
                className="w-full max-w-2xl border-3 border-dashed border-blue-200 rounded-[40px] bg-white p-20 flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer group shadow-sm"
              >
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".xlsx, .xls" />
                <CloudUpload size={64} className="text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-slate-700">Tải tệp danh sách Excel</h3>
                <p className="text-slate-400 mt-1 italic text-sm">Hệ thống sẽ nhận diện SBD, Ngày sinh, CCCD...</p>
              </div>
              <button onClick={downloadTemplate} className="mt-8 flex items-center gap-2 text-blue-600 font-bold hover:underline">
                <Download size={18} /> Tải file mẫu chuẩn (Khối 6 & 10)
              </button>
            </div>
          ) : (
            <div className="animate-in slide-in-from-bottom-6 duration-500">
              {/* File Info */}
              <div className="flex items-center justify-between mb-6 bg-white p-5 rounded-3xl border border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100">
                    <FileCheck size={24} />
                  </div>
                  <span className="font-bold text-slate-800 text-lg uppercase tracking-tight">{fileName}</span>
                </div>
                <button onClick={() => setCandidates([])} disabled={isUploading} className="px-5 py-2 text-red-500 hover:bg-red-50 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all">
                  <Trash2 size={18} /> Chọn file khác
                </button>
              </div>

              {/* Table Preview */}
              <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b">
                      <tr>
                        <th className="px-6 py-5">STT</th>
                        <th className="px-6 py-5">Họ và Tên</th>
                        <th className="px-6 py-5 text-center">Khối</th>
                        <th className="px-6 py-5">Ngày sinh / CCCD</th>
                        <th className="px-6 py-5 text-center">SBD</th>
                        <th className="px-6 py-5 text-center">Toán</th>
                        <th className="px-6 py-5 text-center">Toán PK</th>

                        <th className="px-6 py-5 text-center">Văn</th>
                        <th className="px-6 py-5 text-center">Văn PK</th>

                        <th className="px-6 py-5 text-center">Anh</th>
                        <th className="px-6 py-5 text-center">Anh PK</th>

                        <th className="px-6 py-5 text-center">Khuyến khích</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {candidates.map((item, index) => (
                        <tr key={index} className="hover:bg-blue-50/40 transition-colors">
                          <td className="px-6 py-4 text-slate-400 font-bold">{index + 1}</td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-800 uppercase">{item.name}</div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${item.grade === 10 ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                              LỚP {item.grade}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-slate-700 font-bold">{item.dob}</div>
                            <div className="text-slate-400 text-[10px] font-mono leading-none mt-1 uppercase">CCCD: {item.cccd}</div>
                          </td>
                          <td className="px-6 py-4 text-center font-mono font-bold text-blue-600">{item.sbd}</td>
                          <td className="px-6 py-4 text-center font-bold">
                            {item.math}
                          </td>

                          <td className="px-6 py-4 text-center">
                            {item.mathReview !== null ? (
                              <span className="font-bold text-green-600">
                                {item.mathReview}
                              </span>
                            ) : (
                              <span className="text-slate-300">—</span>
                            )}
                          </td>

                          <td className="px-6 py-4 text-center font-bold">
                            {item.literature}
                          </td>

                          <td className="px-6 py-4 text-center">
                            {item.literatureReview !== null ? (
                              <span className="font-bold text-green-600">
                                {item.literatureReview}
                              </span>
                            ) : (
                              <span className="text-slate-300">—</span>
                            )}
                          </td>

                          <td className="px-6 py-4 text-center font-bold">
                            {item.english}
                          </td>

                          <td className="px-6 py-4 text-center">
                            {item.englishReview !== null ? (
                              <span className="font-bold text-green-600">
                                {item.englishReview}
                              </span>
                            ) : (
                              <span className="text-slate-300">—</span>
                            )}
                          </td>

                          <td className="px-6 py-4 text-center text-orange-500 font-black">
                            +{item.bonusPoint}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-10 py-6 border-t border-slate-100 flex justify-between items-center bg-white rounded-b-[40px]">
          <button onClick={handleClose} disabled={isUploading} className="text-slate-400 font-bold hover:text-slate-600">Hủy bỏ</button>
          <button
            onClick={handleConfirmUpload}
            disabled={candidates.length === 0 || isUploading}
            className={`flex items-center gap-2 px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all
              ${candidates.length > 0 && !isUploading
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-200 hover:brightness-110 active:scale-95'
                : 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'}`}
          >
            {isUploading ? (
              <><Loader2 size={18} className="animate-spin" /> Đang lưu dữ liệu...</>
            ) : (
              <> Xác nhận lưu {candidates.length > 0 && candidates.length} hồ sơ <ChevronRight size={18} /> </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadExcelModal;