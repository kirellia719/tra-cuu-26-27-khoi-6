import EditCandidateModal from './EditCandidateModal';
import { Table, Modal, message } from 'antd';
import { Edit2, Trash2, AlertCircle } from 'lucide-react'; // Thêm icon cảnh báo
import { candidateService } from '../../services/candidateService';
import { useState } from 'react';

const { confirm } = Modal;

const CandidateTable = ({ data, isLoading, onRefresh }) => {
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hàm hiển thị Modal xác nhận xóa
  const showDeleteConfirm = (record) => {
    confirm({
      title: <span className="text-lg font-bold">Xác nhận xóa thí sinh</span>,
      icon: <AlertCircle className="text-rose-500 mb-2" size={24} />,
      content: (
        <div className="py-2">
          <p>Bạn có chắc chắn muốn xóa thí sinh <span className="font-bold text-rose-600">{record.name}</span>?</p>
          <p className="text-xs text-slate-400 mt-1">Hành động này không thể hoàn tác.</p>
        </div>
      ),
      okText: 'Xóa dữ liệu',
      okType: 'danger',
      okButtonProps: {
        className: 'bg-rose-500 hover:bg-rose-600 border-none h-10 px-6 rounded-lg font-semibold'
      },
      cancelText: 'Hủy bỏ',
      cancelButtonProps: {
        className: 'h-10 px-6 rounded-lg font-semibold'
      },
      centered: true, // Hiển thị modal ở giữa màn hình
      maskClosable: true, // Cho phép đóng khi nhấn ra ngoài
      onOk: async () => {
        try {
          await candidateService.delete(record._id);
          message.success(`Đã xóa thí sinh ${record.name} thành công`);
          if (onRefresh) onRefresh();
        } catch (error) {
          message.error(error.message || 'Không thể xóa thí sinh');
        }
      },
    });
  };

  const columns = [
    {
      title: <span className="whitespace-nowrap">STT</span>,
      key: 'stt',
      width: 60,
      align: 'center',
      render: (_, __, index) => <span className="text-sm text-slate-400">{index + 1}</span>,
    },
    {
      title: <span className="whitespace-nowrap">Số báo danh</span>,
      dataIndex: 'sbd',
      key: 'sbd',
      width: 120,
      align: 'center',
      sorter: (a, b) => a.sbd.localeCompare(b.sbd),
      render: (text) => <span className="text-sm font-bold text-slate-600">{text}</span>,
    },
    {
      title: <span className="whitespace-nowrap">Họ và tên</span>,
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex flex-col min-w-[180px]">
          <span className="text-sm font-semibold text-slate-800">{text}</span>
          <span className="text-[11px] text-slate-400 tracking-tight">CCCD: {record.cccd}</span>
        </div>
      ),
    },
    {
      title: <span className="whitespace-nowrap">Ngày sinh</span>,
      dataIndex: 'dob',
      key: 'dob',
      align: 'center',
      width: 110,
      render: (text) => <span className="text-sm text-slate-500">{text}</span>,
    },
    {
      title: <span className="whitespace-nowrap">Khối</span>,
      dataIndex: 'grade',
      key: 'grade',
      align: 'center',
      width: 100,
      render: (grade) => <span className="text-sm text-slate-500">{grade}</span>,
    },
    {
      title: "Toán",
      key: "math",
      align: "center",
      width: 120,
      render: (_, record) => (
        <div className="flex flex-col">
          <span>{record.math}</span>

          {record.mathReview != null && (
            <span className="text-[11px] font-semibold text-emerald-600">
              PK: {record.mathReview}
            </span>
          )}
        </div>
      ),
    },
    {
      title: "Văn",
      key: "literature",
      align: "center",
      width: 120,
      render: (_, record) => (
        <div className="flex flex-col">
          <span>{record.literature}</span>

          {record.literatureReview != null && (
            <span className="text-[11px] font-semibold text-emerald-600">
              PK: {record.literatureReview}
            </span>
          )}
        </div>
      ),
    },
    {
      title: "Anh",
      key: "english",
      align: "center",
      width: 120,
      render: (_, record) => (
        <div className="flex flex-col">
          <span>{record.english}</span>

          {record.englishReview != null && (
            <span className="text-[11px] font-semibold text-emerald-600">
              PK: {record.englishReview}
            </span>
          )}
        </div>
      ),
    },
    {
      title: <span className="whitespace-nowrap">Trạng thái</span>,
      dataIndex: 'isPass',
      key: 'isPass',
      align: 'center',
      width: 140,
      render: (isPass) => (
        <div className="whitespace-nowrap">
          {isPass === true ? (
            <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase">Trúng tuyển</span>
          ) : isPass === false ? (
            <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-100 uppercase">Trượt</span>
          ) : (
            <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200 uppercase">Chưa chốt</span>
          )}
        </div>
      ),
    },
    {
      title: <span className="whitespace-nowrap">Điểm tổng</span>,
      dataIndex: "totalScore",
      key: "totalScore",
      align: "center",
      width: 120,
      sorter: (a, b) => (a.totalScore || 0) - (b.totalScore || 0),
      render: (totalScore) => (
        <span className="text-sm font-bold text-[#366dc9]">
          {(totalScore || 0).toFixed(2)}
        </span>
      ),
    },
    {
      title: <span className="whitespace-nowrap">Thao tác</span>,
      key: 'action',
      align: 'center',
      width: 130,
      render: (_, record) => (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => {
              setEditingCandidate(record);
              setIsModalOpen(true);
            }}
            className="p-2 text-amber-500 hover:bg-amber-50 rounded-xl transition-all active:scale-90 cursor-pointer"
            title="Sửa thông tin"
          >
            <Edit2 size={18} />
          </button>

          <button
            onClick={() => showDeleteConfirm(record)}
            className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all active:scale-90 cursor-pointer"
            title="Xóa thí sinh"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded shadow-sm border border-slate-100 overflow-hidden">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
        pagination={false}
        loading={isLoading}
        rowClassName={() => 'border-b border-slate-50 hover:bg-blue-50/30 transition-colors cursor-default'}
        scroll={{ x: 'max-content' }}
        bordered={false}
      />
      <EditCandidateModal
        open={isModalOpen}
        candidate={editingCandidate}
        onCancel={() => setIsModalOpen(false)}
        onSuccess={onRefresh}
      />
    </div>
  );
};

export default CandidateTable;