import { Row, Col, Form, Input, Button, Checkbox, Typography } from 'antd';
import { GoogleOutlined, FacebookOutlined, LinkedinOutlined } from '@ant-design/icons';

const LoginPage = () => {
  const onFinish = (values:any) => {
    console.log('Received values:', values);
  };

  return (
    <Row style={{ height: '100vh' }}>
      <Col span={10} style={{ backgroundColor: '#ffffff', padding: '20px' }}>
        <Row justify="center">
          <GoogleOutlined style={{ fontSize: '24px', color: '#4285F4', marginRight: '10px' }} />
          <FacebookOutlined style={{ fontSize: '24px', color: '#1877F2', marginRight: '10px' }} />
          <LinkedinOutlined style={{ fontSize: '24px', color: '#0A66C2' }} />
        </Row>
        <Typography.Text style={{ display: 'block', textAlign: 'center', margin: '10px 0' }}>or use your account</Typography.Text>
        
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Checkbox>Remember me</Checkbox>
            <a href="#">Forgot password?</a>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Col>

      <Col span={14} style={{ backgroundColor: 'linear-gradient(to bottom right, #4CAF50, #2E7D32)', padding: '20px', color: '#ffffff', textAlign: 'center' }}>
        <Typography.Title level={2}>Hello, Friend!</Typography.Title>
        <Typography.Text>If you don't have an account, just enter your personal details and start journey with us</Typography.Text>
        <Button type="default" style={{ marginTop: '20px' }}>Create new account</Button>
      </Col>
    </Row>
  );
};

export default LoginPage;
