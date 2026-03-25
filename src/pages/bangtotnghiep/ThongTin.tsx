import React, { useState } from "react";
import { Card, Form, Input, Button, Table, DatePicker } from "antd";

const ThongTin: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Số vào sổ",
      dataIndex: "soVaoSo",
    },
    {
      title: "Số hiệu",
      dataIndex: "soHieu",
    },
    {
      title: "MSV",
      dataIndex: "msv",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngaySinh",
    },
  ];

  const onFinish = (values: any) => {
    const newItem = {
      key: Date.now(),
      soVaoSo: list.length + 1,
      soHieu: values.soHieu,
      msv: values.msv,
      hoTen: values.hoTen,
      ngaySinh: values.ngaySinh?.format("DD/MM/YYYY"),
    };

    setList([...list, newItem]);

    form.resetFields();
  };

  return (
    <Card title="Thông tin văn bằng">

      <Form
        form={form}
        layout="inline"
        onFinish={onFinish}
      >
        <Form.Item
          name="soHieu"
          rules={[{ required: true }]}
        >
          <Input placeholder="Số hiệu" />
        </Form.Item>

        <Form.Item
          name="msv"
          rules={[{ required: true }]}
        >
          <Input placeholder="MSV" />
        </Form.Item>

        <Form.Item
          name="hoTen"
          rules={[{ required: true }]}
        >
          <Input placeholder="Họ tên" />
        </Form.Item>

        <Form.Item name="ngaySinh">
          <DatePicker />
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

export default ThongTin;