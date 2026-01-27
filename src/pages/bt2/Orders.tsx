import { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
} from 'antd';
import dayjs from 'dayjs';

interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  /* INIT */
  useEffect(() => {
    const data = localStorage.getItem('orders');
    setOrders(data ? JSON.parse(data) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  /* CREATE ORDER */
  const handleCreate = () => {
    form.validateFields().then((values) => {
      const newOrder: Order = {
        id: `DH${Date.now()}`,
        customerName: values.customerName,
        phone: values.phone,
        address: values.address,
        totalAmount: values.totalAmount,
        status: 'Chờ xử lý',
        createdAt: dayjs().format('YYYY-MM-DD'),
      };

      setOrders([...orders, newOrder]);
      setOpen(false);
      form.resetFields();
    });
  };

  /* TABLE */
  const columns = [
    { title: 'Mã đơn', dataIndex: 'id' },
    { title: 'Khách hàng', dataIndex: 'customerName' },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      render: (v: number) => v.toLocaleString(),
    },
    {
      title: 'Trạng thái',
      render: (_: any, r: Order) => (
        <Select
          value={r.status}
          onChange={(v) =>
            setOrders((prev) =>
              prev.map((o) => (o.id === r.id ? { ...o, status: v } : o)),
            )
          }
          options={[
            { value: 'Chờ xử lý' },
            { value: 'Đang giao' },
            { value: 'Hoàn thành' },
            { value: 'Đã hủy' },
          ]}
        />
      ),
    },
    { title: 'Ngày tạo', dataIndex: 'createdAt' },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} style={{ marginBottom: 16 }}>
        Tạo đơn hàng
      </Button>

      <Table rowKey="id" columns={columns} dataSource={orders} />

      <Modal
        visible={open}
        title="Tạo đơn hàng"
        onOk={handleCreate}
        onCancel={() => setOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="customerName" label="Tên khách hàng" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true },
              { pattern: /^[0-9]{10,11}$/, message: 'SĐT không hợp lệ' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="totalAmount"
            label="Tổng tiền"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Orders;
