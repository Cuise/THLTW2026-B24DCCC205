import React, { useState } from "react";
import { Table, Button, Modal, Select, message } from "antd";

const ThanhVien: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button 
        type="primary" 
        style={{ marginBottom: 16 }} 
        disabled={!selectedKeys.length}
        onClick={() => setIsModalOpen(true)}
      >
        Thay đổi CLB cho {selectedKeys.length} thành viên
      </Button>
      
      <Table 
        rowSelection={{ selectedRowKeys: selectedKeys, onChange: setSelectedKeys }}
        columns={[
          { title: "Họ tên", dataIndex: "name" },
          { title: "Email", dataIndex: "email" },
          { title: "CLB hiện tại", dataIndex: "clb" },
        ]}
        dataSource={[]}
      />

      <Modal 
        title="Đổi Câu lạc bộ" 
        visible={isModalOpen} 
        onOk={() => { message.success("Chuyển thành công"); setIsModalOpen(false); }}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>Chọn câu lạc bộ muốn chuyển đến:</p>
        <Select style={{ width: "100%" }} placeholder="Chọn danh mục CLB">
          <Select.Option value="1">CLB Guitar</Select.Option>
          <Select.Option value="2">CLB IT</Select.Option>
        </Select>
      </Modal>
    </div>
  );
};

export default ThanhVien;