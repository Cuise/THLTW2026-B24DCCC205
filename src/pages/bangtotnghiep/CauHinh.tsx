import React, { useState } from "react";
import { Card, Form, Input, Button, Table, Select } from "antd";

const CauHinh: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Tên field",
      dataIndex: "ten",
    },
    {
      title: "Kiểu dữ liệu",
      dataIndex: "kieu",
    },
  ];

  const onFinish = (values: any) => {
    const newItem = {
      key: Date.now(),
      ten: values.ten,
      kieu: values.kieu,
    };

    setList([...list, newItem]);
    form.resetFields();
  };

  return (
    <Card title="Cấu hình biểu mẫu">

      <Form
        form={form}
        layout="inline"
        onFinish={onFinish}
      >

        <Form.Item
          name="ten"
          rules={[{ required: true }]}
        >
          <Input placeholder="Tên field" />
        </Form.Item>

        <Form.Item name="kieu">

          <Select
            style={{ width: 120 }}
            options={[
              { value: "string", label: "String" },
              { value: "number", label: "Number" },
              { value: "date", label: "Date" },
            ]}
          />

        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>

      </Form>

      <br />

      <Table
        columns={columns}
        dataSource={list}
        pagination={false}
      />

    </Card>
  );
};

export default CauHinh;