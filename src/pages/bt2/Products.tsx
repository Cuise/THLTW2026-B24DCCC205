import { useEffect, useMemo, useState } from 'react';
import {
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Slider,
  Space,
} from 'antd';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

const initialProducts: Product[] = [
  { id: 1, name: 'Laptop Dell XPS 13', category: 'Laptop', price: 25000000, quantity: 15 },
  { id: 2, name: 'iPhone 15 Pro Max', category: 'Điện thoại', price: 30000000, quantity: 8 },
  { id: 3, name: 'Samsung Galaxy S24', category: 'Điện thoại', price: 22000000, quantity: 20 },
  { id: 4, name: 'iPad Air M2', category: 'Máy tính bảng', price: 18000000, quantity: 5 },
  { id: 5, name: 'MacBook Air M3', category: 'Laptop', price: 28000000, quantity: 12 },
  { id: 6, name: 'AirPods Pro 2', category: 'Phụ kiện', price: 6000000, quantity: 0 },
  { id: 7, name: 'Samsung Galaxy Tab S9', category: 'Máy tính bảng', price: 15000000, quantity: 7 },
  { id: 8, name: 'Logitech MX Master 3', category: 'Phụ kiện', price: 2500000, quantity: 25 },
];

const getStatus = (quantity: number) => {
  if (quantity === 0) return { text: 'Hết hàng', color: 'red' };
  if (quantity <= 10) return { text: 'Sắp hết', color: 'orange' };
  return { text: 'Còn hàng', color: 'green' };
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  // filter state
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000000]);

  const [form] = Form.useForm();

  /* ================== INIT DATA ================== */
  useEffect(() => {
    const data = localStorage.getItem('products');
    setProducts(data ? JSON.parse(data) : initialProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  /* ================== FILTER ================== */
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchName = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category ? p.category === category : true;
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const productStatus = getStatus(p.quantity).text;
      const matchStatus = status ? productStatus === status : true;
      return matchName && matchCategory && matchPrice && matchStatus;
    });
  }, [products, search, category, priceRange, status]);

  /* ================== EDIT ================== */
  const openEdit = (product: Product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setOpen(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct?.id ? { ...p, ...values } : p)),
      );
      setOpen(false);
    });
  };

  /* ================== TABLE ================== */
  const columns = [
    {
      title: 'STT',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      sorter: (a: Product, b: Product) => a.price - b.price,
      render: (v: number) => v.toLocaleString(),
    },
    {
      title: 'Tồn kho',
      dataIndex: 'quantity',
      sorter: (a: Product, b: Product) => a.quantity - b.quantity,
    },
    {
      title: 'Trạng thái',
      render: (_: any, record: Product) => {
        const status = getStatus(record.quantity);
        return <Tag color={status.color}>{status.text}</Tag>;
      },
    },
    {
      title: 'Thao tác',
      render: (_: any, record: Product) => (
        <Button type="link" onClick={() => openEdit(record)}>
          Sửa
        </Button>
      ),
    },
  ];

  return (
    <>
      {/* FILTER */}
      <Space style={{ marginBottom: 16 }} wrap>
        <Input
          placeholder="Tìm theo tên"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          placeholder="Danh mục"
          allowClear
          style={{ width: 150 }}
          onChange={setCategory}
          options={[
            { value: 'Laptop' },
            { value: 'Điện thoại' },
            { value: 'Máy tính bảng' },
            { value: 'Phụ kiện' },
          ]}
        />
        <Select
          placeholder="Trạng thái"
          allowClear
          style={{ width: 150 }}
          onChange={setStatus}
          options={[
            { value: 'Còn hàng' },
            { value: 'Sắp hết' },
            { value: 'Hết hàng' },
          ]}
        />
        <div style={{ width: 200 }}>
          <span>Khoảng giá</span>
          <Slider
            range
            max={30000000}
            step={1000000}
            value={priceRange}
            onChange={(v) => setPriceRange(v as [number, number])}
          />
        </div>
      </Space>

      {/* TABLE */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredProducts}
        pagination={{ pageSize: 5 }}
      />

      {/* MODAL EDIT */}
      <Modal
        visible={open}
        title="Sửa sản phẩm"
        onOk={handleSave}
        onCancel={() => setOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Danh mục" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 'Laptop' },
                { value: 'Điện thoại' },
                { value: 'Máy tính bảng' },
                { value: 'Phụ kiện' },
              ]}
            />
          </Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
          <Form.Item name="quantity" label="Số lượng" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Products;
