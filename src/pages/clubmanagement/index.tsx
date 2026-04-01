import React from "react";
import { Tabs, Card } from "antd";

import Dashboard from "./Dashboard";
import DanhSachCLB from "./DanhSach";
import DonDangKy from "./DonDangKy";
import ThanhVien from "./ThanhVien";

const { TabPane } = Tabs;

const QuanLyCLB: React.FC = () => {
  return (
    <Card>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Báo cáo thống kê" key="1">
          <Dashboard />
        </TabPane>

        <TabPane tab="Danh sách CLB" key="2">
          <DanhSachCLB />
        </TabPane>

        <TabPane tab="Quản lý đơn đăng ký" key="3">
          <DonDangKy />
        </TabPane>

        <TabPane tab="Quản lý thành viên" key="4">
          <ThanhVien />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default QuanLyCLB;