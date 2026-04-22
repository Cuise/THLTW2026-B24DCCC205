import React from "react";
import { Row, Col, Avatar, Typography, Tag, Space, Divider } from "antd";
import { GithubOutlined, FacebookOutlined, MailOutlined, LinkedinOutlined, GlobalOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const GioiThieu: React.FC = () => {
  const skills = ["Tày Sửu", "Cố đạ", "Chua tay dau", "Lieu Nhu Yen", ];

  return (
    <div style={{ padding: "20px", maxWidth: 900, margin: "0 auto" }}>
      <Row gutter={[32, 32]} align="middle">
        <Col xs={24} md={8} style={{ textAlign: "center" }}>
          <Avatar 
            size={200} 
            src="https://images.gamebanana.com/img/ss/mods/69a40152405e6.jpg" 
            style={{ border: "4px solid #1890ff" }}
          />
          <Title level={2} style={{ marginTop: 16 }}>Minh</Title>
          <Text type="secondary">Genshit all day all night</Text>
          <div style={{ marginTop: 16 }}>
            <Space size="large">
              <GithubOutlined style={{ fontSize: 24 }} />
              <LinkedinOutlined style={{ fontSize: 24, color: "#0077b5" }} />
              <FacebookOutlined style={{ fontSize: 24, color: "#1877f2" }} />
            </Space>
          </div>
        </Col>

        <Col xs={24} md={16}>
          <Title level={3}>Về tôi</Title>
          <Paragraph style={{ fontSize: 16 }}>
            Test test 123
          </Paragraph>

          <Divider orientation="left">Kỹ năng chuyên môn</Divider>
          <div style={{ marginBottom: 24 }}>
            {skills.map(skill => (
              <Tag color="blue" key={skill} style={{ marginBottom: 8, padding: "4px 12px", fontSize: 14 }}>
                {skill}
              </Tag>
            ))}
          </div>

          <Divider orientation="left">Liên hệ</Divider>
          <Space direction="vertical">
            <Text><MailOutlined /> Email: xyz@gmail.com</Text>
            <Text><GlobalOutlined /> Website: xyz.com</Text>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default GioiThieu;