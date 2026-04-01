import React from "react";
import { Row, Col, Card, Statistic } from "antd";
import Chart from "react-apexcharts";

const Dashboard: React.FC = () => {
  const chartOptions = {
    chart: { id: "clb-stat" },
    xaxis: { categories: ["CLB Guitar", "CLB IT", "CLB Kỹ năng"] },
    colors: ["#faad14", "#52c41a", "#ff4d4f"],
  };

  const chartSeries = [
    { name: "Pending", data: [12, 19, 3] },
    { name: "Approved", data: [45, 52, 38] },
    { name: "Rejected", data: [5, 2, 8] },
  ];

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}><Card><Statistic title="Số CLB" value={12} /></Card></Col>
        <Col span={6}><Card><Statistic title="Đơn Pending" value={25} valueStyle={{ color: "#faad14" }} /></Card></Col>
        <Col span={6}><Card><Statistic title="Đơn Approved" value={135} valueStyle={{ color: "#52c41a" }} /></Card></Col>
        <Col span={6}><Card><Statistic title="Đơn Rejected" value={15} valueStyle={{ color: "#ff4d4f" }} /></Card></Col>
      </Row>
      <Card title="Số đơn đăng ký theo từng CLB">
        <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
      </Card>
    </div>
  );
};

export default Dashboard;