import React from "react";
import { Tabs } from "antd";

import QuanLy from "./QuanLy";
import LichHen from "./LichHen";
import DanhGia from "./DanhGia";
import ThongKe from "./ThongKe";

const { TabPane } = Tabs;

const DatLichDichVu: React.FC = () => {
  return (
    <Tabs defaultActiveKey="1">

      <TabPane tab="Nhân viên & Dịch vụ" key="1">
        <QuanLy />
      </TabPane>

      <TabPane tab="Lịch hẹn" key="2">
        <LichHen />
      </TabPane>

      <TabPane tab="Đánh giá" key="3">
        <DanhGia />
      </TabPane>

      <TabPane tab="Thống kê" key="4">
        <ThongKe />
      </TabPane>

    </Tabs>
  );
};

export default DatLichDichVu;