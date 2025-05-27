import React from "react";
import { Typography, Row, Col, Card, Space, Divider, Button, Grid } from "antd";
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, FacebookOutlined, TwitterOutlined, LinkedinOutlined } from "@ant-design/icons";
import mapImage from '../../assets/images/extendRentShop.jpg'; // Statik harita resmi

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const Contact: React.FC = () => {
  const screens = useBreakpoint();

  return (
<div style={{ padding: "48px", fontFamily: "Arial, sans-serif", minHeight: "100vh" }}>
      <Row justify="center" style={{ marginBottom: "48px" }}>
        <Col>
          <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>İletişim</Title>
          <Divider style={{ backgroundColor: "#ccc" }} />
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center">
        <Col span={24} md={8}>
          <div style={{ textAlign: "center" }}>
            <Button type="text" icon={<PhoneOutlined />} size="large" block style={{ textAlign: "left", color: 'white' }}>+90 123 456 78 90</Button>
            <Button type="text" icon={<MailOutlined />} size="large" block style={{ textAlign: "left", color: 'white' }}>info@example.com</Button>
            <Button type="text" icon={<EnvironmentOutlined />} size="large" block style={{ textAlign: "left", color: 'white' }}>1234 Ant Design St, React City, Türkiye</Button>
          </div>
        </Col>
        <Col span={24} md={16}>
          <img src={mapImage} alt="Harita" style={{ maxWidth: "90%", maxHeight: "60%" }} />
        </Col>
      </Row>
      <Divider style={{ backgroundColor: "#ccc", margin: "48px 0" }} />
      <Row justify="center" style={{ marginBottom: "48px" }}>
        <Col>
          <Button type="primary" shape="round" icon={<FacebookOutlined />} size="large" href="https://www.facebook.com/" target="_blank">
            Facebook
          </Button>
          <Button type="primary" shape="round" icon={<TwitterOutlined />} size="large" href="https://www.twitter.com/" target="_blank">
            Twitter
          </Button>
          <Button type="primary" shape="round" icon={<LinkedinOutlined />} size="large" href="https://www.linkedin.com/" target="_blank">
            Linkedin
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;