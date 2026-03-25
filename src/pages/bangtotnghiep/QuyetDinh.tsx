import React, { useState } from "react";
import { Card, Form, Input, Button, Table, DatePicker } from "antd";

const QuyetDinh: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Số QĐ",
      dataIndex: "soQD",
    },
    {
      title: "Ngày",
      dataIndex: "ngay",
    },
    {
      title: "Trích yếu",
      dataIndex: "trichYeu",
    },
    {
      title: "Lượt tra cứu",
      dataIndex: "luot",
    },
  ];

  const onFinish = (values: any) => {
    const newItem = {
      key: Date.now(),
      soQD: values.soQD,
      ngay: values.ngay?.format("DD/MM/YYYY"),
      trichYeu: values.trichYeu,
      luot: 0,
    };

    setList([...list, newItem]);
    form.resetFields();
  };

  return (
    <Card title="Quyết định tốt nghiệp">

      <Form
        form={form}
        layout="inline"
        onFinish={onFinish}
      >

        <Form.Item
          name="soQD"
          rules={[{ required: true }]}
        >
          <Input placeholder="Số QĐ" />
        </Form.Item>

        <Form.Item name="ngay">
          <DatePicker />
        </Form.Item>

        <Form.Item name="trichYeu">
          <Input placeholder="Trích yếu" />
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

export default QuyetDinh;