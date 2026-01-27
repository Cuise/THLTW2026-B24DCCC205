import { Card, Col, Row, Statistic, Tag } from 'antd';
import { useEffect, useMemo, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  totalAmount: number;
  status: string;
}

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const p = localStorage.getItem('products');
    const o = localStorage.getItem('orders');

    setProducts(p ? JSON.parse(p) : []);
    setOrders(o ? JSON.parse(o) : []);
  }, []);

  /* ===== THỐNG KÊ ===== */
  const totalProducts = products.length;

  const totalStockValue = useMemo(() => {
    return products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  }, [products]);

  const totalOrders = orders.length;

  const revenue = useMemo(() => {
    return orders
      .filter((o) => o.status === 'Hoàn thành')
      .reduce((sum, o) => sum + o.totalAmount, 0);
  }, [orders]);

  const orderStatusCount = useMemo(() => {
    const result = {
      'Chờ xử lý': 0,
      'Đang giao': 0,
      'Hoàn thành': 0,
      'Đã hủy': 0,
    };
    orders.forEach((o) => {
      result[o.status as keyof typeof result]++;
    });
    return result;
  }, [orders]);

  return (
    <div style={{ marginBottom: 24 }}>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Tổng sản phẩm" value={totalProducts} />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title="Giá trị tồn kho"
              value={totalStockValue}
              formatter={(v) => Number(v).toLocaleString()}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic title="Tổng đơn hàng" value={totalOrders} />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title="Doanh thu"
              value={revenue}
              formatter={(v) => Number(v).toLocaleString()}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 16 }} title="Trạng thái đơn hàng">
        <Tag color="blue">Chờ xử lý: {orderStatusCount['Chờ xử lý']}</Tag>
        <Tag color="orange">Đang giao: {orderStatusCount['Đang giao']}</Tag>
        <Tag color="green">Hoàn thành: {orderStatusCount['Hoàn thành']}</Tag>
        <Tag color="red">Đã hủy: {orderStatusCount['Đã hủy']}</Tag>
      </Card>
    </div>
  );
};

export default Dashboard;
