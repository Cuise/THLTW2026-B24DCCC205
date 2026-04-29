import React, { useState } from 'react';
import { Tabs, Card } from 'antd';
import Dashboard from './Dashboard';
import NhatKyTapLuyen from './NhatKy';
import ChiSoSucKhoe from './ChiSo';
import QuanLyMucTieu from './QuanLy';
import ThuVienBaiTap from './ThuVien';

const Index: React.FC = () => {
  return (
    <Card className="min-h-screen shadow-lg">
      <Tabs defaultActiveKey="1" type="line" size="large" centered>
        <Tabs.TabPane tab="Tổng quan" key="1"><Dashboard /></Tabs.TabPane>
        <Tabs.TabPane tab="Nhật ký tập" key="2"><NhatKyTapLuyen /></Tabs.TabPane>
        <Tabs.TabPane tab="Chỉ số sức khỏe" key="3"><ChiSoSucKhoe /></Tabs.TabPane>
        <Tabs.TabPane tab="Mục tiêu" key="4"><QuanLyMucTieu /></Tabs.TabPane>
        <Tabs.TabPane tab="Thư viện" key="5"><ThuVienBaiTap /></Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default Index;