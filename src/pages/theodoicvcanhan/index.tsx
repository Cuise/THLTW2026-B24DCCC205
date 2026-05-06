import React, { useState } from 'react';
import { Tabs, Card, Typography } from 'antd';
import { DashboardOutlined, ProjectOutlined, UnorderedListOutlined } from '@ant-design/icons';
import DashboardTask from './Dashboard';
import KanbanBoard from './KanbanBoard';
import TaskList from './TaskList';

const { Title } = Typography;

const index: React.FC = () => {
  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <Card bordered={false} style={{ marginBottom: '24px', borderRadius: '12px' }}>
        <Title level={2} style={{ margin: 0 }}>Quản Lý Công Việc Cá Nhân</Title>
      </Card>
      
      <Tabs defaultActiveKey="1" type="card" size="large">
        <Tabs.TabPane tab={<span><DashboardOutlined />Tổng quan</span>} key="1">
          <DashboardTask />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<span><ProjectOutlined />Kanban Board</span>} key="2">
          <KanbanBoard />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<span><UnorderedListOutlined />Danh sách Task</span>} key="3">
          <TaskList />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default index;