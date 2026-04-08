import React from "react";
import { Row, Col, Card, Rate, Select, Input, Button, message } from "antd";

const KhamPha: React.FC<{ onSelect: (item: any) => void }> = ({ onSelect }) => {
  const destinations = [
    { id: 1, name: "Vịnh Hạ Long", type: "bien", price: 2000000, rating: 5, img: "#001529" },
    { id: 2, name: "Đà Lạt", type: "nui", price: 1500000, rating: 4.5, img: "#002140" },
    { id: 3, name: "Hà Nội", type: "thanhpho", price: 800000, rating: 4, img: "#003466" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>
        <Select placeholder="Loại hình" style={{ width: 150 }} allowClear>
          <Select.Option value="bien">Biển</Select.Option>
          <Select.Option value="nui">Núi</Select.Option>
          <Select.Option value="thanhpho">Thành phố</Select.Option>
        </Select>
        <Input.Search placeholder="Tìm theo giá hoặc địa điểm..." style={{ width: 250 }} />
      </div>
      <Row gutter={[16, 16]}>
        {destinations.map((item) => (
          <Col xs={24} sm={12} md={8} key={item.id}>
            <Card
              hoverable
              cover={<div style={{ height: 150, background: item.img, borderRadius: "8px 8px 0 0" }} />}
              actions={[<Button type="primary" onClick={() => { onSelect(item); message.success("Đã thêm!"); }}>Chọn</Button>]}
            >
              <Card.Meta title={item.name} description={`Giá: ${item.price.toLocaleString()}đ`} />
              <Rate disabled defaultValue={item.rating} style={{ fontSize: 12, marginTop: 10 }} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default KhamPha;