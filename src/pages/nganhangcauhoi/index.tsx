import React from "react";
import { Tabs } from "antd";

import KhoiKienThuc from "./KhoiKienThuc";
import MonHoc from "./MonHoc";
import CauHoi from "./QLCauHoi";
import DeThi from "./QLDeThi";

const { TabPane } = Tabs;

const NganHangCauHoi: React.FC = () => {
  return (
    <Tabs defaultActiveKey="1">

      <TabPane tab="Khối kiến thức" key="1">
        <KhoiKienThuc />
      </TabPane>

      <TabPane tab="Môn học" key="2">
        <MonHoc />
      </TabPane>

      <TabPane tab="Câu hỏi" key="3">
        <CauHoi />
      </TabPane>

      <TabPane tab="Đề thi" key="4">
        <DeThi />
      </TabPane>

    </Tabs>
  );
};

export default NganHangCauHoi;