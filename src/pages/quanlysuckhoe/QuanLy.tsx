import React, { useState, useEffect } from 'react';
import { Card, Button, Drawer, Form, Input,Tag, InputNumber, Select, Progress, Row, Col, Space, Popconfirm, Segmented, message } from 'antd';
import { PlusOutlined, DeleteOutlined, FlagOutlined } from '@ant-design/icons';

const QuanLyMucTieu: React.FC = () => {
  const [goals, setGoals] = useState<any[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string | number>('Tất cả');
  const [form] = Form.useForm();

  useEffect(() => {
    const saved = localStorage.getItem('fitness_goals');
    if (saved) setGoals(JSON.parse(saved));
  }, []);

  const handleSave = (values: any) => {
    const newGoal = {
      ...values,
      id: Date.now(),
      current: 0, // Giá trị hiện tại khởi tạo là 0
      status: 'Đang thực hiện'
    };
    const newData = [newGoal, ...goals];
    setGoals(newData);
    localStorage.setItem('fitness_goals', JSON.stringify(newData));
    setIsDrawerOpen(false);
    form.resetFields();
    message.success('Đã thêm mục tiêu mới!');
  };

  const updateProgress = (id: number, newValue: number) => {
    const newData = goals.map(g => {
      if (g.id === id) {
        const status = newValue >= g.target ? 'Đã đạt' : 'Đang thực hiện';
        return { ...g, current: newValue, status };
      }
      return g;
    });
    setGoals(newData);
    localStorage.setItem('fitness_goals', JSON.stringify(newData));
  };

  const filteredGoals = goals.filter(g => 
    filterStatus === 'Tất cả' ? true : g.status === filterStatus
  );

  return (
    <div>
      <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between' }}>
        <Segmented 
          options={['Tất cả', 'Đang thực hiện', 'Đã đạt']} 
          value={filterStatus}
          onChange={(value) => setFilterStatus(value)}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsDrawerOpen(true)}>
          Thêm mục tiêu
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {filteredGoals.map(goal => (
          <Col xs={24} sm={12} key={goal.id}>
            <Card 
              title={<><FlagOutlined /> {goal.name}</>}
              extra={
                <Popconfirm title="Xóa mục tiêu này?" onConfirm={() => {
                  const newData = goals.filter(g => g.id !== goal.id);
                  setGoals(newData);
                  localStorage.setItem('fitness_goals', JSON.stringify(newData));
                }}>
                  <Button type="text" danger icon={<DeleteOutlined />} />
                </Popconfirm>
              }
            >
              <div style={{ marginBottom: 10 }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Tiến độ: {goal.current} / {goal.target} ({goal.unit})</span>
                    <Tag color={goal.status === 'Đã đạt' ? 'green' : 'blue'}>{goal.status}</Tag>
                  </div>
                  <Progress percent={Math.round((goal.current / goal.target) * 100)} status="active" />
                  <div>
                    <span>Cập nhật giá trị: </span>
                    <InputNumber 
                      min={0} 
                      defaultValue={goal.current} 
                      onBlur={(e) => updateProgress(goal.id, Number(e.target.value))}
                    />
                  </div>
                  <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Hạn chót: {goal.deadline}</div>
                </Space>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Drawer
        title="Thêm mục tiêu mới"
        width={400}
        onClose={() => setIsDrawerOpen(false)}
        visible={isDrawerOpen}
        extra={<Button type="primary" onClick={() => form.submit()}>Lưu</Button>}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item name="name" label="Tên mục tiêu" rules={[{ required: true }]}>
            <Input placeholder="Ví dụ: Giảm cân, Chạy bộ..." />
          </Form.Item>
          <Form.Item name="type" label="Loại mục tiêu">
            <Select options={[
              { value: 'Giảm cân', label: 'Giảm cân' },
              { value: 'Tăng cơ', label: 'Tăng cơ' },
              { value: 'Sức bền', label: 'Cải thiện sức bền' }
            ]} />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="target" label="Giá trị mục tiêu" rules={[{ required: true }]}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="unit" label="Đơn vị" rules={[{ required: true }]}>
                <Input placeholder="kg, km, buổi..." />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="deadline" label="Ngày hết hạn" rules={[{ required: true }]}>
            <Input type="date" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default QuanLyMucTieu;