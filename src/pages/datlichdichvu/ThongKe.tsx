import React, { useState, useEffect } from "react";
import { Table } from "antd";
import moment from "moment";
import { Row, Col, Card } from "antd";
const ThongKe = () => {

  const [appointments, setAppointments] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {

    const a = localStorage.getItem("appointments");
    const s = localStorage.getItem("services");

    if (a) setAppointments(JSON.parse(a));
    if (s) setServices(JSON.parse(s));

  }, []);

  // chỉ lấy lịch hoàn thành

  const done = appointments.filter(
    a => a.status === "Hoàn thành"
  );

  // ====== thống kê theo ngày ======

  const byDay: any = {};

  done.forEach(a => {

    const d = moment(a.date).format("YYYY-MM-DD");

    byDay[d] = (byDay[d] || 0) + 1;

  });

  const dayData = Object.keys(byDay).map(k => ({
    key: k,
    day: k,
    total: byDay[k]
  }));

  // ====== thống kê theo tháng ======

  const byMonth: any = {};

  done.forEach(a => {

    const m = moment(a.date).format("YYYY-MM");

    byMonth[m] = (byMonth[m] || 0) + 1;

  });

  const monthData = Object.keys(byMonth).map(k => ({
    key: k,
    month: k,
    total: byMonth[k]
  }));

  // ====== doanh thu theo dịch vụ ======

  const getPrice = (name: string) => {
    const s = services.find(
      (x: any) => x.name === name
    );
    return s ? s.price : 0;
  };

  const byService: any = {};

  done.forEach(a => {

    const p = getPrice(a.service);

    byService[a.service] =
      (byService[a.service] || 0) + p;

  });

  const serviceData = Object.keys(byService).map(k => ({
    key: k,
    name: k,
    money: byService[k]
  }));

  // ====== doanh thu theo nhân viên ======

  const byStaff: any = {};

  done.forEach(a => {

    const p = getPrice(a.service);

    byStaff[a.staff] =
      (byStaff[a.staff] || 0) + p;

  });

  const staffData = Object.keys(byStaff).map(k => ({
    key: k,
    name: k,
    money: byStaff[k]
  }));

  return (

<Row gutter={16}>

  <Col span={12}>

    <Card title="Theo ngày">

      <Table
        dataSource={dayData}
        columns={[
          { title: "Ngày", dataIndex: "day" },
          { title: "Số lịch", dataIndex: "total" }
        ]}
        pagination={false}
        size="small"
      />

    </Card>

  </Col>


  <Col span={12}>

    <Card title="Theo tháng">

      <Table
        dataSource={monthData}
        columns={[
          { title: "Tháng", dataIndex: "month" },
          { title: "Số lịch", dataIndex: "total" }
        ]}
        pagination={false}
        size="small"
      />

    </Card>

  </Col>


  <Col span={12} style={{ marginTop: 16 }}>

    <Card title="Doanh thu theo dịch vụ">

      <Table
        dataSource={serviceData}
        columns={[
          { title: "Dịch vụ", dataIndex: "name" },
          { title: "Doanh thu", dataIndex: "money" }
        ]}
        pagination={false}
        size="small"
      />

    </Card>

  </Col>


  <Col span={12} style={{ marginTop: 16 }}>

    <Card title="Doanh thu theo nhân viên">

      <Table
        dataSource={staffData}
        columns={[
          { title: "Nhân viên", dataIndex: "name" },
          { title: "Doanh thu", dataIndex: "money" }
        ]}
        pagination={false}
        size="small"
      />

    </Card>

  </Col>

</Row>

);

};

export default ThongKe;