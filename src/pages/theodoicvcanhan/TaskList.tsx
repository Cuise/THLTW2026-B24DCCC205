import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Tag, Space, Popconfirm, message, Modal, Form, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem('kanban_tasks') || '[]'));
  }, []);

  const saveTasks = (newTasks: any[]) => {
    setTasks(newTasks);
    localStorage.setItem('kanban_tasks', JSON.stringify(newTasks));
  };

  const handleDelete = (id: string) => {
    const updated = tasks.filter(t => t.id !== id);
    saveTasks(updated);
    message.success('Đã xóa công việc');
  };

  const handleOpenEditModal = (task: any) => {
    setEditingTaskId(task.id);
    form.setFieldsValue({
      ...task,
      deadline: task.deadline ? dayjs(task.deadline) : null
    });
    setIsModalOpen(true);
  };

  const handleSaveEdit = (values: any) => {
    const formattedDeadline = values.deadline ? values.deadline.format('YYYY-MM-DD') : null;
    const updated = tasks.map(t => 
      t.id === editingTaskId 
        ? { ...t, ...values, deadline: formattedDeadline } 
        : t
    );
    
    saveTasks(updated);
    setIsModalOpen(false);
    setEditingTaskId(null);
    form.resetFields();
    message.success('Đã cập nhật công việc thành công');
  };

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = filterStatus ? t.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { title: 'Tên công việc', dataIndex: 'title', key: 'title', fontWeight: 'bold' },
    { 
      title: 'Trạng thái', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => {
        if (status === 'TODO') return <Tag color="red">Cần làm</Tag>;
        if (status === 'DOING') return <Tag color="orange">Đang làm</Tag>;
        return <Tag color="green">Hoàn thành</Tag>;
      }
    },
    { 
      title: 'Độ ưu tiên', 
      dataIndex: 'priority', 
      key: 'priority',
      render: (p: string) => {
        let color = 'blue';
        if (p === 'Cao') color = 'red';
        if (p === 'Trung bình') color = 'orange';
        return <Tag color={color}>{p}</Tag>;
      }
    },
    { 
      title: 'Hạn chót', 
      dataIndex: 'deadline', 
      key: 'deadline',
      sorter: (a: any, b: any) => dayjs(a.deadline).unix() - dayjs(b.deadline).unix()
    },
    { title: 'Tag', dataIndex: 'tag', key: 'tag', render: (tag: string) => tag ? <Tag>{tag}</Tag> : null },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <a onClick={() => handleOpenEditModal(record)}>Sửa</a>
          <Popconfirm title="Xóa công việc này?" onConfirm={() => handleDelete(record.id)}>
            <a style={{ color: '#ff4d4f' }}>Xóa</a>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div>
      <Space style={{ marginBottom: '16px' }}>
        <Input 
          placeholder="Tìm theo tên task..." 
          prefix={<SearchOutlined />} 
          onChange={e => setSearchText(e.target.value)} 
          style={{ width: 250 }}
        />
        <Select 
          placeholder="Lọc theo trạng thái" 
          allowClear 
          onChange={value => setFilterStatus(value)}
          style={{ width: 180 }}
          options={[
            { value: 'TODO', label: 'Cần làm' },
            { value: 'DOING', label: 'Đang làm' },
            { value: 'DONE', label: 'Hoàn thành' }
          ]}
        />
      </Space>

      <Table dataSource={filteredTasks} columns={columns} rowKey="id" />

      <Modal 
        title="Chỉnh sửa công việc" 
        visible={isModalOpen} 
        onOk={() => form.submit()} 
        onCancel={() => {
          setIsModalOpen(false);
          setEditingTaskId(null);
          form.resetFields();
        }}
        okText="Cập nhật"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" onFinish={handleSaveEdit}>
          <Form.Item name="title" label="Tên công việc" rules={[{ required: true, message: 'Vui lòng nhập tên công việc' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Space style={{ display: 'flex' }} align="baseline">
            <Form.Item name="status" label="Trạng thái" rules={[{ required: true }]} style={{ width: 150 }}>
              <Select options={[
                { value: 'TODO', label: 'Cần làm' },
                { value: 'DOING', label: 'Đang làm' },
                { value: 'DONE', label: 'Hoàn thành' }
              ]} />
            </Form.Item>
            <Form.Item name="priority" label="Mức độ ưu tiên" rules={[{ required: true }]} style={{ width: 150 }}>
              <Select options={[{ value: 'Cao' }, { value: 'Trung bình' }, { value: 'Thấp' }]} />
            </Form.Item>
          </Space>
          <Form.Item name="tag" label="Tag (Nhãn)">
            <Input placeholder="Fixbug, UI, Docs..." style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="deadline" label="Hạn chót (Deadline)">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskList;