import React from "react";
import { Table, Button, Row, Col, Card, Statistic, Tag } from "antd";
import Chart from "react-apexcharts";

const TrangQuanTri: React.FC = () => {
  const adminStats = {
    series: [{ name: "Lịch trình được tạo", data: [10, 25, 45, 30, 60] }],
    options: { chart: { id: "admin-chart" }, xaxis: { categories: ["T1", "T2", "T3", "T4", "T5"] } }
  };

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col span={8}><Card><Statistic title="Tổng điểm đến" value={45} /></Card></Col>
        <Col span={8}><Card><Statistic title="Lượt lập lịch" value={1200} /></Card></Col>
        <Col span={8}><Card><Statistic title="Doanh thu dự tính" value={500} suffix="tr" /></Card></Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Địa điểm phổ biến nhất">
            <Chart options={adminStats.options} series={adminStats.series} type="line" height={250} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Quản lý dữ liệu" extra={<Button type="primary" size="small">Thêm mới</Button>}>
            <Table 
              size="small"
              columns={[{ title: "Tên", dataIndex: "name" }, { title: "Loại", dataIndex: "type" }, { title: "Rating", dataIndex: "rate" }]} 
              dataSource={[{ key: '1', name: 'Hạ Long', type: 'Biển', rate: '5.0' }]} 
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TrangQuanTri;