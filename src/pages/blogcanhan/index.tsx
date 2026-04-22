import React, { useState, useEffect } from "react";
import { Tabs, Card } from "antd";
import TrangChu from "./TrangChu";
import ChiTietBaiViet from "./ChiTietBaiViet";
import GioiThieu from "./GioiThieu";
import QuanLyBaiViet from "./QuanLyBaiViet";
import QuanLyThe from "./QuanLyThe";

const { TabPane } = Tabs;

const PersonalBlog: React.FC = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // Hàm chuyển sang trang chi tiết
  const viewPost = (id: string) => {
    setSelectedPostId(id);
    setActiveTab("2");
  };

  return (
    <Card className="min-h-screen">
      <Tabs activeKey={activeTab} onChange={setActiveTab} type="card">
        <TabPane tab="Trang chủ" key="1">
          <TrangChu onViewPost={viewPost} />
        </TabPane>

        <TabPane tab="Chi tiết bài viết" key="2" disabled={!selectedPostId}>
          <ChiTietBaiViet postId={selectedPostId} onBack={() => setActiveTab("1")} />
        </TabPane>

        <TabPane tab="Giới thiệu" key="3">
          <GioiThieu />
        </TabPane>

        <TabPane tab="Quản lý bài viết" key="4">
          <QuanLyBaiViet />
        </TabPane>

        <TabPane tab="Quản lý thẻ" key="5">
          <QuanLyThe />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default PersonalBlog;