import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Select,
  Input,
  InputNumber
} from "antd";

const DanhGia = () => {

  const [reviews, setReviews] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);

  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  // load

  useEffect(() => {

    const r = localStorage.getItem("reviews");
    const a = localStorage.getItem("appointments");

    if (r) setReviews(JSON.parse(r));
    if (a) setAppointments(JSON.parse(a));

  }, []);

  useEffect(() => {
    localStorage.setItem(
      "reviews",
      JSON.stringify(reviews)
    );
  }, [reviews]);

  // chỉ lấy lịch hoàn thành

  const doneList = appointments.filter(
    a => a.status === "Hoàn thành"
  );

  // thêm đánh giá

  const add = () => {

    form.validateFields().then(v => {

      const newR = {
        id: Date.now(),
        staff: v.staff,
        star: v.star,
        text: v.text,
        reply: ""
      };

      setReviews([...reviews, newR]);

      form.resetFields();
      setOpen(false);

    });

  };

  // phản hồi

  const reply = (id: number) => {

    const txt = prompt("Phản hồi");

    if (!txt) return;

    const newList = reviews.map(r =>
      r.id === id ? { ...r, reply: txt } : r
    );

    setReviews(newList);

  };

  // tính trung bình

  const avg = (name: string) => {

    const list = reviews.filter(
      r => r.staff === name
    );

    if (list.length === 0) return 0;

    const s = list.reduce(
      (a, b) => a + b.star,
      0
    );

    return (s / list.length).toFixed(1);

  };

  // table

  const cols = [

    {
      title: "Nhân viên",
      dataIndex: "staff"
    },

    {
      title: "Sao",
      dataIndex: "star"
    },

    {
      title: "Nội dung",
      dataIndex: "text"
    },

    {
      title: "Phản hồi",
      dataIndex: "reply"
    },

    {
      title: "TB",
      render: (r: any) => avg(r.staff)
    },

    {
      title: "Action",
      render: (r: any) => (

        <Button
          onClick={() => reply(r.id)}
        >
          Phản hồi
        </Button>

      )
    }

  ];

  return (

    <>

      <Button
        type="primary"
        onClick={() => setOpen(true)}
      >
        Thêm đánh giá
      </Button>

      <Table
        columns={cols}
        dataSource={reviews}
        rowKey="id"
      />

      <Modal
        title="Đánh giá"
        visible={open}
        onOk={add}
        onCancel={() => setOpen(false)}
      >

        <Form form={form} layout="vertical">

          <Form.Item
            name="staff"
            label="Nhân viên"
            rules={[{ required: true }]}
          >
            <Select>

              {doneList.map(a => (

                <Select.Option
                  key={a.id}
                  value={a.staff}
                >
                  {a.staff}
                </Select.Option>

              ))}

            </Select>
          </Form.Item>

          <Form.Item
            name="star"
            label="Sao"
            rules={[{ required: true }]}
          >
            <InputNumber
              min={1}
              max={5}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="text"
            label="Nội dung"
          >
            <Input />
          </Form.Item>

        </Form>

      </Modal>

    </>

  );

};

export default DanhGia;