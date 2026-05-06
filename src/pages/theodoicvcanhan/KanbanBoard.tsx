import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, Tag, Button, Modal, Form, Input, Select, DatePicker, Space, message, Row, Col} from 'antd';
import { PlusOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem('kanban_tasks') || '[]'));
  }, []);

  const saveTasks = (newTasks: any[]) => {
    setTasks(newTasks);
    localStorage.setItem('kanban_tasks', JSON.stringify(newTasks));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    const updated = tasks.map(t => t.id === draggableId ? { ...t, status: destination.droppableId } : t);
    saveTasks(updated);
  };

  const handleCreate = (values: any) => {
    const newTask = {
      ...values,
      id: Date.now().toString(),
      status: 'TODO',
      deadline: values.deadline ? values.deadline.format('YYYY-MM-DD') : null
    };
    saveTasks([newTask, ...tasks]);
    setIsModalOpen(false);
    form.resetFields();
    message.success('Đã thêm công việc mới');
  };

  const getPriorityColor = (p: string) => {
    if (p === 'Cao') return 'red';
    if (p === 'Trung bình') return 'orange';
    return 'blue';
  };

  const columns = [
    { id: 'TODO', title: 'Cần làm', color: '#ff4d4f' },
    { id: 'DOING', title: 'Đang làm', color: '#faad14' },
    { id: 'DONE', title: 'Hoàn thành', color: '#52c41a' }
  ];

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)} style={{ marginBottom: '24px' }}>
        Thêm công việc
      </Button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Row gutter={16}>
          {columns.map(col => (
            <Col xs={24} lg={8} key={col.id}>
              <Card 
                title={<Space><div style={{ width: 8, height: 8, borderRadius: '50%', background: col.color }} />{col.title}</Space>}
                bodyStyle={{ background: '#f0f2f5', padding: '8px', minHeight: '500px' }}
              >
                <Droppable droppableId={col.id}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: '500px' }}>
                      {tasks.filter(t => t.status === col.id).map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(dragProvided) => (
                            <div 
                              ref={dragProvided.innerRef} 
                              {...dragProvided.draggableProps} 
                              {...dragProvided.dragHandleProps}
                              style={{ marginBottom: '8px', ...dragProvided.draggableProps.style }}
                            >
                              <Card size="small" bordered={false} style={{ borderRadius: '8px' }}>
                                <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>{task.title}</div>
                                <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '8px' }}>{task.description}</div>
                                <Space wrap>
                                  <Tag color={getPriorityColor(task.priority)}>{task.priority}</Tag>
                                  {task.tag && <Tag>{task.tag}</Tag>}
                                </Space>
                                {task.deadline && (
                                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#bfbfbf' }}>
                                    <CalendarOutlined /> {task.deadline}
                                  </div>
                                )}
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Card>
            </Col>
          ))}
        </Row>
      </DragDropContext>

      <Modal title="Thêm công việc mới" visible={isModalOpen} onOk={() => form.submit()} onCancel={() => setIsModalOpen(false)}>
        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item name="title" label="Tên công việc" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Space style={{ display: 'flex' }} align="baseline">
            <Form.Item name="priority" label="Mức độ ưu tiên" initialValue="Trung bình" style={{ width: 150 }}>
              <Select options={[{ value: 'Cao' }, { value: 'Trung bình' }, { value: 'Thấp' }]} />
            </Form.Item>
            <Form.Item name="tag" label="Tag (Nhãn)" style={{ width: 150 }}>
              <Input placeholder="Fixbug, UI, Docs..." />
            </Form.Item>
          </Space>
          <Form.Item name="deadline" label="Hạn chót (Deadline)">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default KanbanBoard;