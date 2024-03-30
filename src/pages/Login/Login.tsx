import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Alert,
} from "antd";
import {
  GoogleOutlined,
  FacebookOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import imageLogin from "../../assets/images/leo1.jpg";
import { useAppDispatch } from "../../store/useAppDispatch";
import { addSignIn } from "../../store/slices/signInSlice";
import { useState } from "react";
import { useAppSelector } from "../../store/useAppSelector";
import { RootState } from "../../store/configureStore";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.signIn.error);

  const handleSubmit = async (values: any) => {
    try {
      await dispatch(
        addSignIn({ email: values.email, password: values.password })
      );
      setSuccessMessage("İşlem başarılı. Hoşgeldiniz !");
      // Anasayfaya yönlendirme
      window.location.href = "/";
    } catch (error) {
      console.error("Giriş işlemi başarısız oldu: ", error);
      setErrorMessage(
        "Giriş işlemi başarısız oldu. Lütfen bilgilerinizi kontrol edin."
      );
    }
  };

  return (
    <Row
      style={{
        height: "63vh",
        marginTop: "50px",
        width: "70%",
        margin: "142px auto auto auto",
      }}
    >
      <Col
        span={10}
        style={{
          backgroundColor: "rgb(30 30 30 / 58%)",
          padding: "20px",
          borderBottomLeftRadius: "50px",
          borderTopLeftRadius: "50px",
        }}
      >
        {/* <Row justify="center">
          <GoogleOutlined style={{ fontSize: '24px', color: '#4285F4', marginRight: '10px' }} />
          <FacebookOutlined style={{ fontSize: '24px', color: '#1877F2', marginRight: '10px' }} />
          <LinkedinOutlined style={{ fontSize: '24px', color: '#0A66C2' }} />
        </Row>
        <Typography.Text style={{ display: 'block', textAlign: 'center', margin: '10px 0' }}>or use your account</Typography.Text> */}

        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          style={{ marginTop: "60px" }}
        >
          <Typography.Title
            level={2}
            style={{ color: "white", textAlign: "center" }}
          >
            Giriş Yap
          </Typography.Title>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Lütfen mail adresinizi giriniz!" },
            ]}
            style={{ marginTop: "50px" }}
          >
            <Input placeholder="E-Posta" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Lütfen şifrenizi giriniz!" }]}
            style={{ marginTop: "40px" }}
          >
            <Input.Password placeholder="Şifre" />
          </Form.Item>
          {/* <Form.Item >
            <a href="#">Forgot password?</a>
          </Form.Item> */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", marginTop: "40px" }}
            >
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
      </Col>

      <Col
        span={14}
        style={{
          backgroundImage: `url(${imageLogin})`,
          padding: "20px",
          textAlign: "center",
          borderBottomRightRadius: "50px",
          borderTopRightRadius: "50px",
          backgroundSize: "cover",
        }}
      >
        <Typography.Title level={2} style={{ color: "white" }}>
          Merhaba !
        </Typography.Title>
        <Typography.Text
          style={{ color: "white", fontSize: "medium", width: "100%" }}
        >
          Hesabınız yoksa, kişisel bilgilerinizi girin ve bizimle bir yolculuğa
          başlayın.
        </Typography.Text>
        <Button type="primary" style={{ marginTop: "20px" }}>
          <Link to="/signup">Yeni Hesap Oluştur</Link>
        </Button>
      </Col>
      <div style={{ width: "236px",marginTop:"20px",marginLeft:"36px"}}>
      {errorCustom && <Alert type="error" message={errorCustom} showIcon/>}
      {!errorCustom && successMessage && (
        <Alert type="success" message={successMessage} showIcon/>
      )}
      </div>
    </Row>
  );
};

export default Login;
