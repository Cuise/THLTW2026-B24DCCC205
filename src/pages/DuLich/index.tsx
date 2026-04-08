import React, { useState, useEffect } from "react";
import { Tabs, Card } from "antd";
import KhamPha from "./KhamPha";
import LapLichTrinh from "./LichTrinh";
import QuanLyNganSach from "./NganSach";
import TrangQuanTri from "./QuanTri";

const { TabPane } = Tabs;

const PlanDuLich: React.FC = () => {
  const [selectedDestinations, setSelectedDestinations] = useState<any[]>(() => {
    const saved = localStorage.getItem("my_travel_plan");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("my_travel_plan", JSON.stringify(selectedDestinations));
  }, [selectedDestinations]);

  return (
    <Card className="min-h-screen">
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Khám phá điểm đến" key="1">
          <KhamPha onSelect={(item: any) => setSelectedDestinations([...selectedDestinations, item])} />
        </TabPane>
        <TabPane tab="Lập lịch trình" key="2">
          <LapLichTrinh 
            selectedDestinations={selectedDestinations} 
            setSelectedDestinations={setSelectedDestinations} 
          />
        </TabPane>
        <TabPane tab="Quản lý ngân sách" key="3">
          <QuanLyNganSach selectedDestinations={selectedDestinations} />
        </TabPane>
        <TabPane tab="Trang quản trị (Admin)" key="4">
          <TrangQuanTri />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default PlanDuLich;