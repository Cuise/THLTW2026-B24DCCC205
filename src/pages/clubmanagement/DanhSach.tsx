import React from "react";
import { Table, Button, Space, Switch, Input } from "antd";

const DanhSachCLB: React.FC = () => {
  const columns = [
    { title: "Ảnh", dataIndex: "avatar", render: () => <div style={{ width: 40, height: 40, backgroundColor: "#eee" }} /> },
    { title: "Tên câu lạc bộ", dataIndex: "name", sorter: true },
    { title: "Ngày thành lập", dataIndex: "date" },
    { title: "Chủ nhiệm CLB", dataIndex: "leader" },
    { title: "Hoạt động", dataIndex: "active", render: (val: boolean) => <Switch checked={val} /> },
    {
      title: "Thao tác",
      render: () => (
        <Space>
          <Button type="link">Chỉnh sửa</Button>
          <Button type="link" danger>Xóa</Button>
          <Button type="link">Xem thành viên</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
        <Button type="primary">Thêm mới CLB</Button>
        <Input.Search placeholder="Tìm kiếm CLB..." style={{ width: 300 }} />
      </div>
      <Table columns={columns} dataSource={[]} rowKey="id" />
    </div>
  );
};

export default DanhSachCLB;