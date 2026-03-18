import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  InputNumber,
  Tabs,
} from "antd";

const { TabPane } = Tabs;

const QuanLy = () => {

  const [staff, setStaff] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  const [openStaff, setOpenStaff] = useState(false);
  const [openService, setOpenService] = useState(false);

  const [editingStaff, setEditingStaff] = useState<any>(null);
  const [editingService, setEditingService] = useState<any>(null);

  const [formStaff] = Form.useForm();
  const [formService] = Form.useForm();

  // load

  useEffect(() => {
    const s = localStorage.getItem("staff");
    const dv = localStorage.getItem("services");

    if (s) setStaff(JSON.parse(s));
    if (dv) setServices(JSON.parse(dv));
  }, []);

  useEffect(() => {
    localStorage.setItem("staff", JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    localStorage.setItem("services", JSON.stringify(services));
  }, [services]);

  // STAFF

  const addStaff = () => {
    formStaff.validateFields().then(v => {

      if (editingStaff) {

        const newList = staff.map(s =>
          s.id === editingStaff.id ? { ...editingStaff, ...v } : s
        );

        setStaff(newList);

      } else {

        const newStaff = {
          id: Date.now(),
          ...v
        };

        setStaff([...staff, newStaff]);

      }

      setEditingStaff(null);
      formStaff.resetFields();
      setOpenStaff(false);

    });
  };

  const deleteStaff = (id: number) => {
    setStaff(staff.filter(s => s.id !== id));
  };

  // SERVICE

  const addService = () => {

    formService.validateFields().then(v => {

      if (editingService) {

        const newList = services.map(s =>
          s.id === editingService.id ? { ...editingService, ...v } : s
        );

        setServices(newList);

      } else {

        const newService = {
          id: Date.now(),
          ...v
        };

        setServices([...services, newService]);

      }

      setEditingService(null);
      formService.resetFields();
      setOpenService(false);

    });

  };

  const deleteService = (id: number) => {
    setServices(services.filter(s => s.id !== id));
  };

  // TABLE

  const staffCols = [
    { title: "Tên", dataIndex: "name" },
    { title: "Giới hạn/ngày", dataIndex: "limit" },
    { title: "Giờ bắt đầu", dataIndex: "start" },
    { title: "Giờ kết thúc", dataIndex: "end" },

    {
      title: "Action",
      render: (r: any) => (

        <>
          <Button
            onClick={() => {
              setEditingStaff(r);
              setOpenStaff(true);
              formStaff.setFieldsValue(r);
            }}
          >
            Sửa
          </Button>

          <Button
            danger
            onClick={() => deleteStaff(r.id)}
          >
            Xóa
          </Button>
        </>

      )
    }
  ];

  const serviceCols = [
    { title: "Tên", dataIndex: "name" },
    { title: "Giá", dataIndex: "price" },
    { title: "Thời gian", dataIndex: "time" },

    {
      title: "Action",
      render: (r: any) => (

        <>
          <Button
            onClick={() => {
              setEditingService(r);
              setOpenService(true);
              formService.setFieldsValue(r);
            }}
          >
            Sửa
          </Button>

          <Button
            danger
            onClick={() => deleteService(r.id)}
          >
            Xóa
          </Button>
        </>

      )
    }
  ];

  return (

    <>

      <Tabs defaultActiveKey="1">

        <TabPane tab="Nhân viên" key="1">

          <Button
            type="primary"
            onClick={() => {
              setEditingStaff(null);
              formStaff.resetFields();
              setOpenStaff(true);
            }}
          >
            Thêm nhân viên
          </Button>

          <Table
            columns={staffCols}
            dataSource={staff}
            rowKey="id"
          />

        </TabPane>


        <TabPane tab="Dịch vụ" key="2">

          <Button
            type="primary"
            onClick={() => {
              setEditingService(null);
              formService.resetFields();
              setOpenService(true);
            }}
          >
            Thêm dịch vụ
          </Button>

          <Table
            columns={serviceCols}
            dataSource={services}
            rowKey="id"
          />

        </TabPane>

      </Tabs>


      {/* MODAL STAFF */}

      <Modal
        title="Nhân viên"
        visible={openStaff}
        onOk={addStaff}
        onCancel={() => setOpenStaff(false)}
      >

        <Form form={formStaff} layout="vertical">

          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="limit"
            label="Giới hạn/ngày"
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="start"
            label="Giờ bắt đầu"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="end"
            label="Giờ kết thúc"
          >
            <Input />
          </Form.Item>

        </Form>

      </Modal>


      {/* MODAL SERVICE */}

      <Modal
        title="Dịch vụ"
        visible={openService}
        onOk={addService}
        onCancel={() => setOpenService(false)}
      >

        <Form form={formService} layout="vertical">

          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá"
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="time"
            label="Thời gian"
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

        </Form>

      </Modal>

    </>

  );

};

export default QuanLy;