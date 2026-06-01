import { Modal, message } from "antd";
import { BarChart3, Calendar, CreditCard, Edit2, IdCard, Target, User, } from "lucide-react";
import { useEffect, useState } from "react";
import { candidateService } from "../../services/candidateService";

const EditCandidateModal = ({ open, onCancel, candidate, onSuccess }) => {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (candidate) setForm(candidate);
  }, [candidate]);

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const total =
    (form.math || 0) * 2 +
    (form.literature || 0) +
    (form.english || 0) +
    (form.bonusPoint || 0);

  const handleSubmit = async () => {
    try {
      await candidateService.update(candidate._id, form);
      message.success("Cập nhật thành công");
      onSuccess?.();
      onCancel();
    } catch {
      message.error("Lỗi cập nhật");
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText="Lưu"
      cancelText="Hủy"
      centered
    >
      <div className="p-0">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
              <Edit2 className="text-amber-500" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-800">
                CẬP NHẬT THÔNG TIN THÍ SINH
              </div>
            </div>
          </div>
        </div>

        {/* ===== THÔNG TIN ===== */}
        <div className="border border-slate-200 rounded-xl p-4 bg-white mb-5">

          {/* Title */}
          <div className="flex items-center gap-2 mb-5">
            <h3 className="font-bold text-blue-900">
              THÔNG TIN CÁ NHÂN
            </h3>
          </div>

          {/* ===== ROW 1 ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

            <InputWithIcon
              label={<span>Số báo danh <span className="text-red-500">*</span></span>}
              value={form.sbd}
              onChange={(v) => setField("sbd", v)}
              icon={<IdCard size={16} />}
            />

            <InputWithIcon
              label={<span>Họ và tên <span className="text-red-500">*</span></span>}
              value={form.name}
              onChange={(v) => setField("name", v.toUpperCase())}
              icon={<User size={16} />}
            />
          </div>

          {/* ===== ROW 2 ===== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <InputWithIcon
              label={<span>Ngày sinh <span className="text-red-500">*</span></span>}
              value={form.dob}
              onChange={(v) => setField("dob", v)}
              icon={<Calendar size={16} />}
            />

            <InputWithIcon
              label={<span>CCCD <span className="text-red-500">*</span></span>}
              value={form.cccd}
              onChange={(v) => setField("cccd", v)}
              icon={<CreditCard size={16} />}
            />

            {/* Grade */}
            <div>
              <label className="text-sm text-slate-600 font-medium">
                Khối <span className="text-red-500">*</span>
              </label>

              <div className="relative mt-1">
                <select
                  className="w-full h-11 px-3 pr-10 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm appearance-none bg-white"
                  value={form.grade || 10}
                  onChange={(e) => setField("grade", Number(e.target.value))}
                >
                  <option value={6}>Khối 6</option>
                  <option value={10}>Khối 10</option>
                </select>

                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  ▼
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ===== ĐIỂM ===== */}
        <div className="border border-slate-200 rounded-xl p-5 bg-white">

          {/* Title */}
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <Target size={16} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-700">
              ĐIỂM SỐ
            </h3>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">

            <NumberInput
              label="Toán (x2) *"
              value={form.math}
              onChange={(v) => setField("math", v)}
            />

            <NumberInput
              label="Văn *"
              value={form.literature}
              onChange={(v) => setField("literature", v)}
            />

            <NumberInput
              label="Anh *"
              value={form.english}
              onChange={(v) => setField("english", v)}
            />

            <NumberInput
              label="Điểm cộng"
              value={form.bonusPoint}
              onChange={(v) => setField("bonusPoint", v)}
            />
          </div>

          {/* TOTAL */}
          <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-xl px-4 py-4">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <BarChart3 size={18} className="text-blue-600" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-700">
                  TỔNG ĐIỂM
                </p>
                <p className="text-xs text-slate-400">
                  ( Toán x2 + Văn + Anh + Điểm cộng )
                </p>
              </div>
            </div>

            <div className="text-2xl font-bold text-blue-600">
              {total.toFixed(2)}
            </div>
          </div>
        </div>

      </div>
    </Modal>
  );
};

const InputWithIcon = ({ label, value, onChange, icon }) => {
  return (
    <div>
      <label className="text-sm text-slate-600 font-medium">
        {label}
      </label>

      <div className="relative mt-1">
        <input
          className="w-full h-11 px-3 pr-10 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />

        {/* icon right */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>
      </div>
    </div>
  );
};

const NumberInput = ({ label, value, onChange }) => {
  return (
    <div>
      <label className="text-sm text-slate-600 font-medium">
        {label}
      </label>

      <div className="relative mt-1">
        <input
          type="number"
          step="0.01"
          className="w-full h-11 px-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          value={value ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
};
export default EditCandidateModal;