import { Modal, Form, Input, InputNumber, Select, message } from 'antd';
import { useEffect } from 'react';
import { candidateService } from '../../services/candidateService';

const EditCandidateModal = ({ open, onCancel, candidate, onSuccess }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (candidate) {
      form.setFieldsValue(candidate);
    }
  }, [candidate]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      await candidateService.update(candidate._id, values);

      message.success('Cập nhật thí sinh thành công');
      onSuccess?.();
      onCancel();
    } catch (err) {
      message.error(err.message || 'Lỗi cập nhật');
    }
  };

  return (
    <Modal
      title="Sửa thông tin thí sinh"
      open={open}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText="Lưu"
      cancelText="Hủy"
      centered
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Họ và tên" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="sbd" label="Số báo danh" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="cccd" label="CCCD" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="dob" label="Ngày sinh" rules={[{ required: true }]}>
          <Input placeholder="dd/mm/yyyy" />
        </Form.Item>

        <Form.Item name="grade" label="Khối" rules={[{ required: true }]}>
          <Select>
            <Select.Option value={6}>Khối 6</Select.Option>
            <Select.Option value={10}>Khối 10</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="math" label="Toán">
          <InputNumber min={0} max={10} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="literature" label="Văn">
          <InputNumber min={0} max={10} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="english" label="Anh">
          <InputNumber min={0} max={10} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="bonusPoint" label="Điểm cộng">
          <InputNumber min={0} max={10} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCandidateModal;