import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Timeline, Typography } from 'antd';
import Chart from 'react-apexcharts';
import { FireOutlined, ThunderboltOutlined, CalendarOutlined, LineChartOutlined } from '@ant-design/icons';
import { ApexOptions } from 'apexcharts'; // Import kiểu dữ liệu để fix lỗi TS

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalCalories: 0,
    recentWorkouts: []
  });

  const [weightChart, setWeightChart] = useState<{series: any[], categories: string[]}>({
    series: [],
    categories: []
  });

  useEffect(() => {
    // 1. Lấy dữ liệu từ LocalStorage
    const logs = JSON.parse(localStorage.getItem('workout_logs') || '[]');
    const health = JSON.parse(localStorage.getItem('health_stats') || '[]');

    // 2. Tính toán các chỉ số nhanh (KPI)
    const totalCalo = logs.reduce((sum: number, item: any) => sum + (item.calories || 0), 0);
    const completedWorkouts = logs.filter((item: any) => item.status === 'Hoàn thành').length;

    setStats({
      totalWorkouts: completedWorkouts,
      totalCalories: totalCalo,
      recentWorkouts: logs.slice(0, 5) // Lấy 5 buổi tập gần nhất
    });

    // 3. Chuẩn bị dữ liệu cho biểu đồ cân nặng (Lấy 7 bản ghi gần nhất)
    const recentHealth = [...health].reverse().slice(-7);
    setWeightChart({
      series: [{ name: "Cân nặng", data: recentHealth.map(h => h.weight) }],
      categories: recentHealth.map(h => h.date)
    });
  }, []);

  // Định nghĩa Options với kiểu ApexOptions để fix lỗi "Type string is not assignable..."
  const chartOptions: ApexOptions = {
    chart: {
      id: "weight-trend",
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    colors: ['#1890ff'],
    stroke: { curve: 'smooth', width: 3 },
    markers: { size: 4 },
    xaxis: {
      categories: weightChart.categories.length > 0 ? weightChart.categories : ['Chưa có dữ liệu'],
      title: { text: 'Ngày ghi nhận' }
    },
    yaxis: {
      title: { text: 'Cân nặng (kg)' }
    },
    tooltip: { x: { format: 'dd/MM' } }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={3} style={{ marginBottom: 24 }}>Tổng quan hoạt động</Title>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ background: '#e6f7ff' }}>
            <Statistic 
              title="Số buổi tập" 
              value={stats.totalWorkouts} 
              prefix={<CalendarOutlined />} 
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ background: '#fff1f0' }}>
            <Statistic 
              title="Calo đã đốt" 
              value={stats.totalCalories} 
              suffix="kcal" 
              prefix={<FireOutlined />} 
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ background: '#f9f0ff' }}>
            <Statistic 
              title="Chuỗi ngày" 
              value={stats.totalWorkouts > 0 ? 5 : 0} 
              prefix={<ThunderboltOutlined />} 
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ background: '#f6ffed' }}>
            <Statistic 
              title="BMI hiện tại" 
              value={22.5} 
              precision={1}
              prefix={<LineChartOutlined />} 
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={16}>
          <Card title="Biểu đồ xu hướng cân nặng" bordered={false} className="shadow-sm">
            <Chart 
              options={chartOptions} 
              series={weightChart.series} 
              type="line" 
              height={350} 
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Hoạt động gần đây" bordered={false} className="shadow-sm">
            {stats.recentWorkouts.length > 0 ? (
                <Timeline>
                {stats.recentWorkouts.map((w: any) => (
                    <Timeline.Item 
                    key={w.key} 
                    color={w.type === 'Cardio' ? 'blue' : 'green'}
                    >
                    <div style={{ fontWeight: 'bold' }}>{w.name}</div>
                    <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                        {w.date} - {w.duration} phút ({w.calories} kcal)
                    </div>
                    </Timeline.Item>
                ))}
                </Timeline>
            ) : (
                <div style={{ textAlign: 'center', padding: '20px', color: '#bfbfbf' }}>
                    Chưa có dữ liệu tập luyện
                </div>
            )}
        </Card>
    </Col>
  </Row>
</div>
);
};

export default Dashboard;
