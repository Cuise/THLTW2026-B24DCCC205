import React from "react";
import { Row, Col, Card, Statistic, Alert, Progress } from "antd";
import Chart from "react-apexcharts";

const QuanLyNganSach: React.FC<any> = ({ selectedDestinations }) => {
  const total = selectedDestinations.reduce((sum: number, item: any) => sum + item.price, 0);
  const budgetLimit = 5000000;

  const chartConfig = {
    options: { labels: selectedDestinations.map((i: any) => i.name) },
    series: selectedDestinations.map((i: any) => i.price)
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        {total > budgetLimit && <Alert message="Cảnh báo: Bạn đã vượt ngân sách dự kiến (5tr)!" type="error" showIcon />}
      </Col>
      <Col xs={24} md={12}>
        <Card title="Thống kê chi phí">
          <Statistic title="Tổng cộng thực tế" value={total} suffix="đ" />
          <Progress percent={Math.round((total / budgetLimit) * 100)} status={total > budgetLimit ? "exception" : "active"} />
        </Card>
      </Col>
      <Col xs={24} md={12}>
        <Card title="Phân bổ ngân sách">
          <Chart options={chartConfig.options} series={chartConfig.series.length ? chartConfig.series : [1]} type="donut" height={250} />
        </Card>
      </Col>
    </Row>
  );
};

export default QuanLyNganSach;