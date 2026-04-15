import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Space, Input, Select, Modal, Form, InputNumber, Tag, message, Typography } from 'antd';
import { PlusOutlined, SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const { Title } = Typography;

const QuanLyPhongHoc: React.FC = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);

 
  const managers = ['Phùng Thanh Độ', 'Độ Mixue', 'Bảy Cỏ', 'Si Thuế'];

  
  useEffect(() => {
    const saved = localStorage.getItem('danh_sach_phong_hoc');
    if (saved) setDataSource(JSON.parse(saved));
  }, []);


  const saveToLocal = (data: any[]) => {
    setDataSource(data);
    localStorage.setItem('danh_sach_phong_hoc', JSON.stringify(data));
  };

 
  const showModal = (record?: any) => {
    if (record) {
      setEditingKey(record.key);
      form.setFieldsValue(record);
    } else {
      setEditingKey(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  
  const handleDelete = (record: any) => {
    if (record.seats >= 30) {
      message.error('Chỉ được phép xóa phòng có dưới 30 chỗ ngồi!');
      return;
    }

    confirm({
      title: 'Xác nhận xóa phòng học?',
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa phòng ${record.name}?`,
      onOk() {
        const newData = dataSource.filter((item) => item.key !== record.key);
        saveToLocal(newData);
        message.success('Đã xóa phòng học thành công');
      },
    });
  };


  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      
      
      const isDuplicate = dataSource.some(item => 
        (item.code === values.code || item.name === values.name) && item.key !== editingKey
      );

      if (isDuplicate) {
        message.error('Mã phòng hoặc tên phòng đã tồn tại!');
        return;
      }

      if (editingKey) {
      
        const newData = dataSource.map(item => item.key === editingKey ? { ...item, ...values } : item);
        saveToLocal(newData);
        message.success('Cập nhật thành công');
      } else {

        const newItem = { ...values, key: Date.now().toString() };
        saveToLocal([...dataSource, newItem]);
        message.success('Thêm mới thành công');
      }
      setIsModalOpen(false);
    } catch (error) {
      console.log('Validate Failed:', error);
    }
  };

 
  const columns = [
    { title: 'Mã phòng', dataIndex: 'code', key: 'code' },
    { title: 'Tên phòng', dataIndex: 'name', key: 'name' },
    { title: 'Số chỗ ngồi', dataIndex: 'seats', key: 'seats', sorter: (a: any, b: any) => a.seats - b.seats },
    { 
      title: 'Loại phòng', 
      dataIndex: 'type', 
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'Hội trường' ? 'volcano' : type === 'Thực hành' ? 'blue' : 'green'}>
          {type}
        </Tag>
      )
    },
    { title: 'Người phụ trách', dataIndex: 'manager', key: 'manager' },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="link" onClick={() => showModal(record)}>Sửa</Button>
          <Button type="link" danger onClick={() => handleDelete(record)}>Xóa</Button>
        </Space>
      ),
    },
  ];


  const filteredData = dataSource.filter(item => {
    const matchSearch = item.code.toLowerCase().includes(searchText.toLowerCase()) || 
                        item.name.toLowerCase().includes(searchText.toLowerCase());
    const matchType = filterType ? item.type === filterType : true;
    return matchSearch && matchType;
  });

  return (
    <Card>
      <Title level={3}>Quản lý Phòng học</Title>

      {}
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }} wrap>
        <Space wrap>
          <Input 
            placeholder="Tìm mã hoặc tên phòng..." 
            prefix={<SearchOutlined />} 
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 250 }}
          />
          <Select 
            placeholder="Lọc loại phòng" 
            allowClear 
            onChange={val => setFilterType(val)}
            style={{ width: 150 }}
          >
            <Select.Option value="Lý thuyết">Lý thuyết</Select.Option>
            <Select.Option value="Thực hành">Thực hành</Select.Option>
            <Select.Option value="Hội trường">Hội trường</Select.Option>
          </Select>
        </Space>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>Thêm phòng học</Button>
      </Space>

      <Table 
        columns={columns} 
        dataSource={filteredData} 
        pagination={{ pageSize: 5 }}
        scroll={{ x: 800 }} 
      />

      {}
      <Modal 
        title={editingKey ? "Chỉnh sửa phòng học" : "Thêm phòng học mới"} 
        visible={isModalOpen} 
        onOk={handleSave} 
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item 
            label="Mã phòng" 
            name="code" 
            rules={[{ required: true, message: 'Không được để trống' }, { max: 10, message: 'Tối đa 10 ký tự' }]}
          >
            <Input disabled={!!editingKey} />
          </Form.Item>

          <Form.Item 
            label="Tên phòng" 
            name="name" 
            rules={[{ required: true, message: 'Không được để trống' }, { max: 50, message: 'Tối đa 50 ký tự' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            label="Người phụ trách" 
            name="manager" 
            rules={[{ required: true, message: 'Vui lòng chọn người phụ trách' }]}
          >
            <Select>
              {managers.map(m => <Select.Option key={m} value={m}>{m}</Select.Option>)}
            </Select>
          </Form.Item>

          <Form.Item 
            label="Số chỗ ngồi" 
            name="seats" 
            rules={[{ required: true, message: 'Vui lòng nhập số chỗ' }]}
          >
            <InputNumber min={10} max={200} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item 
            label="Loại phòng" 
            name="type" 
            rules={[{ required: true, message: 'Vui lòng chọn loại phòng' }]}
          >
            <Select>
              <Select.Option value="Lý thuyết">Lý thuyết</Select.Option>
              <Select.Option value="Thực hành">Thực hành</Select.Option>
              <Select.Option value="Hội trường">Hội trường</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default QuanLyPhongHoc;