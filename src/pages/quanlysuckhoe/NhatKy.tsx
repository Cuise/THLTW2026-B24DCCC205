import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, InputNumber, Space, Tag, Popconfirm, message, Card } from 'antd';
import { PlusOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const NhatKyTapLuyen: React.FC = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const saved = localStorage.getItem('workout_logs');
    if (saved) setActivities(JSON.parse(saved));
  }, []);

  const saveToLocal = (data: any[]) => {
    setActivities(data);
    localStorage.setItem('workout_logs', JSON.stringify(data));
  };

  const handleOpenModal = (record?: any) => {
    if (record) {
      setEditingKey(record.key);
      form.setFieldsValue({ ...record, date: dayjs(record.date) });
    } else {
      setEditingKey(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const onFinish = (values: any) => {
    const formattedValues = {
      ...values,
      key: editingKey || Date.now().toString(),
      date: values.date.format('YYYY-MM-DD'),
    };

    let newData;
    if (editingKey) {
      newData = activities.map(item => item.key === editingKey ? formattedValues : item);
      message.success('Đã cập nhật buổi tập');
    } else {
      newData = [formattedValues, ...activities];
      message.success('Đã thêm buổi tập mới');
    }

    saveToLocal(newData);
    setIsModalOpen(false);
  };

  const filteredData = activities.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    const matchDate = dateRange 
      ? dayjs(item.date).isAfter(dateRange[0].startOf('day')) && dayjs(item.date).isBefore(dateRange[1].endOf('day'))
      : true;
    return matchSearch && matchDate;
  });

  const columns = [
    { title: 'Ngày', dataIndex: 'date', key: 'date', sorter: (a: any, b: any) => dayjs(a.date).unix() - dayjs(b.date).unix() },
    { title: 'Bài tập', dataIndex: 'name', key: 'name' },
    { 
      title: 'Loại', 
      dataIndex: 'type', 
      key: 'type',
      render: (type: string) => <Tag color="geekblue">{type}</Tag>
    },
    { title: 'Thời lượng (p)', dataIndex: 'duration', key: 'duration' },
    { title: 'Calo đốt', dataIndex: 'calories', key: 'calories', render: (val: number) => <b>{val} kcal</b> },
    { 
      title: 'Trạng thái', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Hoàn thành' ? 'green' : 'volcano'}>{status}</Tag>
      )
    },
    {
      title: 'Thao tác',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" onClick={() => handleOpenModal(record)}>Sửa</Button>
          <Popconfirm title="Xóa buổi tập này?" onConfirm={() => {
            saveToLocal(activities.filter(item => item.key !== record.key));
          }}>
            <Button type="link" danger>Xóa</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <Card>
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }} wrap>
        <Space wrap>
          <Input 
            placeholder="Tìm tên bài tập..." 
            prefix={<SearchOutlined />} 
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <RangePicker onChange={(dates) => setDateRange(dates)} />
        </Space>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => handleOpenModal()}>
          Ghi nhật ký mới
        </Button>
      </Space>

      <Table 
        columns={columns} 
        dataSource={filteredData} 
        pagination={{ pageSize: 7 }} 
      />

      <Modal 
        title={editingKey ? "Sửa buổi tập" : "Thêm buổi tập mới"} 
        visible={isModalOpen} 
        onOk={() => form.submit()} 
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="date" label="Ngày tập" rules={[{ required: true }]} initialValue={dayjs()}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="name" label="Tên bài tập" rules={[{ required: true }]}>
            <Input placeholder="Ví dụ: Chạy bộ công viên, Đẩy ngực..." />
          </Form.Item>
          <Space style={{ display: 'flex' }} align="baseline">
            <Form.Item name="type" label="Loại" rules={[{ required: true }]} style={{ width: 150 }}>
              <Select options={[
                { value: 'Cardio', label: 'Cardio' },
                { value: 'Strength', label: 'Strength' },
                { value: 'Yoga', label: 'Yoga' },
                { value: 'HIIT', label: 'HIIT' },
                { value: 'Other', label: 'Khác' },
              ]} />
            </Form.Item>
            <Form.Item name="status" label="Trạng thái" initialValue="Hoàn thành" style={{ width: 150 }}>
              <Select options={[
                { value: 'Hoàn thành', label: 'Hoàn thành' },
                { value: 'Bỏ lỡ', label: 'Bỏ lỡ' },
              ]} />
            </Form.Item>
          </Space>
          <Space style={{ display: 'flex' }} align="baseline">
            <Form.Item name="duration" label="Thời lượng (phút)" rules={[{ required: true }]}>
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item name="calories" label="Calo ước tính" rules={[{ required: true }]}>
              <InputNumber min={1} />
            </Form.Item>
          </Space>
          <Form.Item name="note" label="Ghi chú">
            <Input.TextArea rows={2} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default NhatKyTapLuyen;