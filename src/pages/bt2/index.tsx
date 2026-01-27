import { Tabs, Card } from 'antd';
import Products from './Products';
import Orders from './Orders';
import Dashboard from './Dashboard';

const { TabPane } = Tabs;

const Bt2 = () => {
  return (
    <div>
      {/* Dashboard */}
      <Dashboard />

      {/* Tabs quản lý */}
      <Card>
        <Tabs defaultActiveKey="products">
          <TabPane tab="Quản lý Sản phẩm" key="products">
            <Products />
          </TabPane>

          <TabPane tab="Quản lý Đơn hàng" key="orders">
            <Orders />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Bt2;
