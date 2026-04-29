import React, { useState } from 'react';
import { Card, Row, Col, Tag, Input, Select, Modal, Typography, Space, Divider } from 'antd';
import { SearchOutlined, FireOutlined } from '@ant-design/icons';

const { Paragraph, Title } = Typography;

const ThuVienBaiTap: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMuscle, setFilterMuscle] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<any>(null);

  const exercises = [
    { id: 1, name: 'Push Up', muscle: 'Chest', level: 'Dễ', calo: 300, desc: 'Bài tập hít đất cơ bản giúp phát triển cơ ngực và bắp tay sau.' },
    { id: 2, name: 'Squat', muscle: 'Legs', level: 'Trung bình', calo: 400, desc: 'Giúp săn chắc cơ đùi và mông.' },
    { id: 3, name: 'Plank', muscle: 'Core', level: 'Dễ', calo: 200, desc: 'Giữ tư thế thẳng người để tập trung vào cơ bụng.' },
    { id: 4, name: 'Burpees', muscle: 'Full Body', level: 'Khó', calo: 600, desc: 'Bài tập cường độ cao giúp đốt mỡ toàn thân.' },
    // Có thể thêm nhiều bài tập nữa...
  ];

  const getLevelColor = (level: string) => {
    if (level === 'Dễ') return 'green';
    if (level === 'Trung bình') return 'orange';
    return 'red';
  };

  const filteredExercises = exercises.filter(ex => 
    ex.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterMuscle ? ex.muscle === filterMuscle : true)
  );

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col span={12}>
          <Input 
            prefix={<SearchOutlined />} 
            placeholder="Tìm tên bài tập..." 
            onChange={e => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col span={12}>
          <Select 
            placeholder="Lọc theo nhóm cơ" 
            style={{ width: '100%' }}
            allowClear
            onChange={value => setFilterMuscle(value)}
            options={[
              { value: 'Chest', label: 'Ngực (Chest)' },
              { value: 'Legs', label: 'Chân (Legs)' },
              { value: 'Core', label: 'Bụng (Core)' },
              { value: 'Full Body', label: 'Toàn thân' },
            ]}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {filteredExercises.map(ex => (
          <Col xs={24} sm={12} lg={8} key={ex.id}>
            <Card 
              hoverable 
              onClick={() => setSelectedExercise(ex)}
              title={ex.name}
            >
              <Space direction="vertical">
                <Space>
                  <Tag color="blue">{ex.muscle}</Tag>
                  <Tag color={getLevelColor(ex.level)}>{ex.level}</Tag>
                </Space>
                <div style={{ color: '#f5222d' }}>
                  <FireOutlined /> {ex.calo} Calo/giờ
                </div>
                <Paragraph ellipsis={{ rows: 2 }}>{ex.desc}</Paragraph>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Hướng dẫn bài tập"
        visible={!!selectedExercise}
        onCancel={() => setSelectedExercise(null)}
        footer={null}
      >
        {selectedExercise && (
          <div>
            <Title level={4}>{selectedExercise.name}</Title>
            <Tag color="blue">{selectedExercise.muscle}</Tag>
            <Divider />
            <p><strong>Mô tả chi tiết:</strong></p>
            <p>{selectedExercise.desc}</p>
            <p><strong>Cường độ:</strong> {selectedExercise.calo} Calo mỗi giờ luyện tập liên tục.</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ThuVienBaiTap;