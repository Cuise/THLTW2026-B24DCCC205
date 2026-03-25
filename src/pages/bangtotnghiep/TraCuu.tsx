import React from "react";
import { Card, Form, Input, Button, message } from "antd";

const TraCuu: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    let count = 0;

    Object.values(values).forEach((v) => {
      if (v) count++;
    });

    if (count < 2) {
      message.error("Nhập ít nhất 2 điều kiện");
      return;
    }

    message.success("Đang tra cứu...");
  };

  return (
    <Card title="Tra cứu văn bằng">

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item name="soHieu" label="Số hiệu">
          <Input />
        </Form.Item>

        <Form.Item name="soVaoSo" label="Số vào sổ">
          <Input />
        </Form.Item>

        <Form.Item name="msv" label="MSV">
          <Input />
        </Form.Item>

        <Form.Item name="hoTen" label="Họ tên">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tra cứu
          </Button>
        </Form.Item>
      </Form>

    </Card>
  );
};

export default TraCuu;