import React from "react";
import { List, Button, Typography, Space, Empty, Card } from "antd";
import { DeleteOutlined, CarOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const LapLichTrinh: React.FC<any> = ({ selectedDestinations, setSelectedDestinations }) => {
  const remove = (index: number) => {
    const newData = [...selectedDestinations];
    newData.splice(index, 1);
    setSelectedDestinations(newData);
  };

  return (
    <div>
      <Title level={4}>Lịch trình du lịch chi tiết</Title>
      {selectedDestinations.length === 0 ? <Empty /> : (
        <List
          dataSource={selectedDestinations}
          renderItem={(item: any, index: number) => (
            <Card size="small" style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Space>
                  <div style={{ background: "#1890ff", color: "#fff", width: 24, height: 24, borderRadius: "50%", textAlign: "center" }}>{index + 1}</div>
                  <Text strong>{item.name}</Text>
                </Space>
                <Button type="text" danger icon={<DeleteOutlined />} onClick={() => remove(index)} />
              </div>
              {index < selectedDestinations.length - 1 && (
                <div style={{ margin: "10px 0 0 34px", color: "#8c8c8c" }}>
                  <CarOutlined /> <Text type="secondary">Di chuyển đến điểm tiếp theo: ~45 phút</Text>
                </div>
              )}
            </Card>
          )}
        />
      )}
    </div>
  );
};

export default LapLichTrinh;