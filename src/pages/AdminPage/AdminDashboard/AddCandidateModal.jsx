import { Modal, Form, Input, Button } from 'antd';
import { UserPlus, User, IdCard, Hash, Calculator } from 'lucide-react';

const AddCandidateModal = ({ isOpen, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <div className="p-2 bg-blue-50 text-[#366dc9] rounded-lg"><UserPlus size={20} /></div>
          <span className="text-lg font-black text-slate-800 uppercase">Thêm thí sinh mới</span>
        </div>
      }
      open={isOpen}
      onCancel={onCancel}
      width={650}
      centered
      footer={[
        <Button key="back" onClick={onCancel} className="rounded-xl font-bold h-10">Hủy</Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()} className="rounded-xl font-bold h-10 bg-[#366dc9]">Lưu thí sinh</Button>
      ]}
    >
      <Form form={form} layout="vertical" className="grid grid-cols-2 gap-x-4 pt-5">
        <Form.Item label={<span className="font-bold text-slate-600">Họ và tên</span>} name="name" className="col-span-2" rules={[{ required: true }]}>
          <Input prefix={<User size={16} className="text-slate-400" />} placeholder="NGUYỄN VĂN A" className="rounded-xl py-2 uppercase" />
        </Form.Item>

        <Form.Item label={<span className="font-bold text-slate-600">Số báo danh</span>} name="sbd" rules={[{ required: true }]}>
          <Input prefix={<Hash size={16} className="text-slate-400" />} placeholder="10001" className="rounded-xl py-2" />
        </Form.Item>

        <Form.Item label={<span className="font-bold text-slate-600">Số CCCD</span>} name="cccd">
          <Input prefix={<IdCard size={16} className="text-slate-400" />} placeholder="066..." className="rounded-xl py-2" />
        </Form.Item>

        <div className="col-span-2 my-2 flex items-center gap-3">
          <div className="h-px bg-slate-100 flex-1"></div>
          <span className="text-[11px] font-black text-slate-400 uppercase">Điểm thi & Ưu tiên</span>
          <div className="h-px bg-slate-100 flex-1"></div>
        </div>

        <Form.Item label={<span className="font-bold text-slate-500">Toán (x2)</span>} name="math">
          <Input type="number" step="0.25" prefix={<Calculator size={14} />} className="rounded-xl py-2" />
        </Form.Item>
        <Form.Item label={<span className="font-bold text-slate-500">Ngữ văn</span>} name="literature">
          <Input type="number" step="0.25" className="rounded-xl py-2" />
        </Form.Item>
        <Form.Item label={<span className="font-bold text-slate-500">Tiếng Anh</span>} name="english">
          <Input type="number" step="0.25" className="rounded-xl py-2" />
        </Form.Item>
        <Form.Item label={<span className="font-bold text-slate-500">Điểm cộng</span>} name="bonus">
          <Input type="number" step="0.25" className="rounded-xl py-2" defaultValue={0} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCandidateModal;