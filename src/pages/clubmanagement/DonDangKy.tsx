import React, { useState } from "react";
import { Table, Button, Space, Tag, message } from "antd";

const DonDangKy: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  const columns = [
    { title: "Họ tên", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Câu lạc bộ", dataIndex: "clb" },
    { title: "Trạng thái", dataIndex: "status", render: (s: string) => <Tag color="gold">{s}</Tag> },
    {
      title: "Thao tác",
      render: () => (
        <Space>
          <Button type="link">Duyệt</Button>
          <Button type="link" danger>Từ chối</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" disabled={!selectedKeys.length} onClick={() => message.success("Đã duyệt")}>
          Duyệt {selectedKeys.length} đơn đã chọn
        </Button>
        <Button danger disabled={!selectedKeys.length}>
          Không duyệt {selectedKeys.length} đơn đã chọn
        </Button>
      </Space>
      <Table 
        rowSelection={{ selectedRowKeys: selectedKeys, onChange: setSelectedKeys }} 
        columns={columns} 
        dataSource={[]} 
      />
    </div>
  );
};

export default DonDangKy;