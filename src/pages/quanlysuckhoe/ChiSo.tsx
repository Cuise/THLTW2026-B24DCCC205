import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, InputNumber, Tag, Space, message, Popconfirm } from 'antd';
import { PlusOutlined, HeartOutlined } from '@ant-design/icons';

const ChiSo: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const saved = localStorage.getItem('health_stats');
    if (saved) setData(JSON.parse(saved));
  }, []);

  const calculateBMI = (weight: number, heightCm: number) => {
    if (!weight || !heightCm) return 0;
    const heightM = heightCm / 100;
    return parseFloat((weight / (heightM * heightM)).toFixed(1));
  };

  const getBMITag = (bmi: number) => {
    if (bmi < 18.5) return <Tag color="blue">Thiếu cân</Tag>;
    if (bmi < 24.9) return <Tag color="green">Bình thường</Tag>;
    if (bmi < 29.9) return <Tag color="orange">Thừa cân</Tag>;
    return <Tag color="red">Béo phì</Tag>;
  };

  const handleSave = (values: any) => {
    const bmi = calculateBMI(values.weight, values.height);
    const newEntry = { ...values, bmi, id: Date.now(), date: new Date().toLocaleDateString() };
    const newData = [newEntry, ...data];
    setData(newData);
    localStorage.setItem('health_stats', JSON.stringify(newData));
    setIsModalOpen(false);
    form.resetFields();
    message.success('Đã cập nhật chỉ số sức khỏe');
  };

  const columns = [
    { title: 'Ngày', dataIndex: 'date', key: 'date' },
    { title: 'Cân nặng (kg)', dataIndex: 'weight', key: 'weight' },
    { title: 'Chiều cao (cm)', dataIndex: 'height', key: 'height' },
    { title: 'BMI', dataIndex: 'bmi', key: 'bmi', render: (bmi: number) => <span>{bmi} {getBMITag(bmi)}</span> },
    { title: 'Nhịp tim (bpm)', dataIndex: 'heartRate', key: 'heartRate', render: (val: number) => <><HeartOutlined style={{color: 'red'}} /> {val}</> },
    { title: 'Giờ ngủ', dataIndex: 'sleep', key: 'sleep', render: (val: number) => `${val}h` },
    {
      title: 'Thao tác',
      render: (_: any, record: any) => (
        <Popconfirm title="Xóa bản ghi này?" onConfirm={() => {
          const newData = data.filter(item => item.id !== record.id);
          setData(newData);
          localStorage.setItem('health_stats', JSON.stringify(newData));
        }}>
          <Button type="link" danger>Xóa</Button>
        </Popconfirm>
      )
    }
  ];

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)} style={{ marginBottom: 16 }}>
        Cập nhật chỉ số hôm nay
      </Button>
      <Table dataSource={data} columns={columns} rowKey="id" />

      <Modal title="Nhập chỉ số sức khỏe" visible={isModalOpen} onOk={() => form.submit()} onCancel={() => setIsModalOpen(false)}>
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Space>
            <Form.Item name="weight" label="Cân nặng (kg)" rules={[{ required: true }]}><InputNumber min={1} /></Form.Item>
            <Form.Item name="height" label="Chiều cao (cm)" rules={[{ required: true }]}><InputNumber min={1} /></Form.Item>
          </Space>
          <Form.Item name="heartRate" label="Nhịp tim lúc nghỉ (bpm)"><InputNumber style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="sleep" label="Giờ ngủ hôm qua"><InputNumber style={{ width: '100%' }} /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ChiSo;