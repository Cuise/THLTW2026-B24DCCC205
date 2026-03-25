import React, { useState } from "react";
import { Card, Form, Input, Button, Table } from "antd";

const SoVanBang: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Năm",
      dataIndex: "nam",
    },
    {
      title: "Số hiện tại",
      dataIndex: "so",
    },
  ];

  const onFinish = (values: any) => {
    const newItem = {
      key: Date.now(),
      nam: values.nam,
      so: 0,
    };

    setList([...list, newItem]);
    form.resetFields();
  };

  return (
    <Card title="Sổ văn bằng">

      <Form
        form={form}
        layout="inline"
        onFinish={onFinish}
      >
        <Form.Item
          name="nam"
          rules={[{ required: true }]}
        >
          <Input placeholder="Năm" />
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

export default SoVanBang;