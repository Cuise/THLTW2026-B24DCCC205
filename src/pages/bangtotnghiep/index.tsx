import React from "react";
import { Tabs, Card } from "antd";

import SoVanBang from "./SoVanBang";
import QuyetDinh from "./QuyetDinh";
import CauHinh from "./CauHinh";
import ThongTin from "./ThongTin";
import TraCuu from "./TraCuu";

const { TabPane } = Tabs;

const BangTotNghiep: React.FC = () => {
  return (
    <Card>

      <Tabs defaultActiveKey="1">

        <TabPane tab="Sổ văn bằng" key="1">
          <SoVanBang />
        </TabPane>

        <TabPane tab="Quyết định" key="2">
          <QuyetDinh />
        </TabPane>

        <TabPane tab="Cấu hình" key="3">
          <CauHinh />
        </TabPane>

        <TabPane tab="Thông tin" key="4">
          <ThongTin />
        </TabPane>

        <TabPane tab="Tra cứu" key="5">
          <TraCuu />
        </TabPane>

      </Tabs>

    </Card>
  );
};

export default BangTotNghiep;