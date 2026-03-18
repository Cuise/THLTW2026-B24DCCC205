import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Select,
  DatePicker,
} from "antd";

import moment from "moment";

const LichHen = () => {

  const [appointments, setAppointments] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  // load

  useEffect(() => {

    const a = localStorage.getItem("appointments");
    const s = localStorage.getItem("staff");
    const dv = localStorage.getItem("services");

    if (a) setAppointments(JSON.parse(a));
    if (s) setStaff(JSON.parse(s));
    if (dv) setServices(JSON.parse(dv));

  }, []);

  useEffect(() => {
    localStorage.setItem(
      "appointments",
      JSON.stringify(appointments)
    );
  }, [appointments]);

  // check trùng

  const checkTrung = (date: string, staff: string) => {

    return appointments.some(
      a => a.date === date && a.staff === staff
    );

  };

  // thêm

  const add = () => {

    form.validateFields().then(v => {

      const date = v.date.format(
        "YYYY-MM-DD HH:mm"
      );

      if (checkTrung(date, v.staff)) {
        alert("Trùng lịch");
        return;
      }

      const newA = {
        id: Date.now(),
        staff: v.staff,
        service: v.service,
        date,
        status: "Chờ"
      };

      setAppointments([...appointments, newA]);

      form.resetFields();
      setOpen(false);

    });

  };

  // đổi trạng thái

  const changeStatus = (id: number, st: string) => {

    const newList = appointments.map(a =>
      a.id === id ? { ...a, status: st } : a
    );

    setAppointments(newList);

  };

  // xoá

  const del = (id: number) => {
    setAppointments(
      appointments.filter(a => a.id !== id)
    );
  };

  // table

  const cols = [

    { title: "Nhân viên", dataIndex: "staff" },
    { title: "Dịch vụ", dataIndex: "service" },
    { title: "Thời gian", dataIndex: "date" },
    { title: "Trạng thái", dataIndex: "status" },

    {
      title: "Action",
      render: (r: any) => (

        <>
          <Button
            onClick={() =>
              changeStatus(r.id, "Xác nhận")
            }
          >
            Duyệt
          </Button>

          <Button
            onClick={() =>
              changeStatus(r.id, "Hoàn thành")
            }
          >
            Done
          </Button>

          <Button
            onClick={() =>
              changeStatus(r.id, "Hủy")
            }
          >
            Hủy
          </Button>

          <Button
            danger
            onClick={() => del(r.id)}
          >
            Xóa
          </Button>

        </>

      )
    }

  ];

  return (

    <>

      <Button
        type="primary"
        onClick={() => setOpen(true)}
      >
        Đặt lịch
      </Button>

      <Table
        columns={cols}
        dataSource={appointments}
        rowKey="id"
      />

      <Modal
        title="Đặt lịch"
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

              {staff.map(s => (
                <Select.Option
                  key={s.id}
                  value={s.name}
                >
                  {s.name}
                </Select.Option>
              ))}

            </Select>
          </Form.Item>

          <Form.Item
            name="service"
            label="Dịch vụ"
            rules={[{ required: true }]}
          >
            <Select>

              {services.map(s => (
                <Select.Option
                  key={s.id}
                  value={s.name}
                >
                  {s.name}
                </Select.Option>
              ))}

            </Select>
          </Form.Item>

          <Form.Item
            name="date"
            label="Ngày giờ"
            rules={[{ required: true }]}
          >
            <DatePicker
              showTime
              style={{ width: "100%" }}
            />
          </Form.Item>

        </Form>

      </Modal>

    </>

  );

};

export default LichHen;