import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Progress } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import dayjs from 'dayjs';

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState({ total: 0, completed: 0, overdue: 0 });
  const [chartData, setChartData] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('kanban_tasks') || '[]');
    const today = dayjs();
    
    const completed = tasks.filter((t: any) => t.status === 'DONE').length;
    const todo = tasks.filter((t: any) => t.status === 'TODO').length;
    const doing = tasks.filter((t: any) => t.status === 'DOING').length;
    
    const overdue = tasks.filter((t: any) => 
      t.status !== 'DONE' && t.deadline && dayjs(t.deadline).isBefore(today, 'day')
    ).length;

    setMetrics({ total: tasks.length, completed, overdue });
    setChartData([todo, doing, completed]);
  }, []);

  const pieOptions: ApexOptions = {
    chart: { type: 'pie' },
    labels: ['Cần làm', 'Đang làm', 'Hoàn thành'],
    colors: ['#ff4d4f', '#faad14', '#52c41a'],
    legend: { position: 'bottom' },
    responsive: [{ breakpoint: 480, options: { chart: { width: 200 } } }]
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card style={{ borderLeft: '4px solid #1890ff' }}>
            <Statistic title="Tổng số công việc" value={metrics.total} prefix={<CalendarOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={{ borderLeft: '4px solid #52c41a' }}>
            <Statistic title="Đã hoàn thành" value={metrics.completed} prefix={<CheckCircleOutlined />} valueStyle={{ color: '#52c41a' }} />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={{ borderLeft: '4px solid #ff4d4f' }}>
            <Statistic title="Quá hạn" value={metrics.overdue} prefix={<ClockCircleOutlined />} valueStyle={{ color: '#ff4d4f' }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} md={12}>
          <Card title="Trạng thái công việc" style={{ height: '380px' }}>
            <Chart options={pieOptions} series={chartData} type="pie" height={280} />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Tiến độ hoàn thành" style={{ height: '380px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Progress 
              type="circle" 
              percent={metrics.total > 0 ? Math.round((metrics.completed / metrics.total) * 100) : 0} 
              width={180}
              strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;