import { Layout, Menu, Dropdown, Avatar } from "antd";
import { Link } from "react-router-dom";
import React, { ReactNode, useState } from "react";
import { DownOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import "./MainLayout.css"; // CSS dosyasını burada içeri aktarın
import useToken from "../../utils/useToken";

const { Header, Content, Footer } = Layout;

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [selectedKey, setSelectedKey] = useState<string>("1"); // Başlangıçta seçili menü öğesinin key'i
  const { token, decodedToken, updateToken, clearToken } = useToken();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuSelect = (e: { key: React.Key }) => {
    // e parametresinin türü belirtiliyor
    setSelectedKey(e.key as string); // Menü öğesi seçildiğinde state'i güncelle
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    // Logout tıklandığında clearToken fonksiyonunu çağır
    clearToken();
    handleClose();
    window.location.reload();
  };
  const menu = (
    <Menu>
    <Menu.Item key="profile">
      <Link to={`/updateCustomer/${decodedToken?.id}`}><UserOutlined style={{ marginRight: "8px" }} />Hesabım</Link>
    </Menu.Item>
    <Menu.Item key="rental">
      <Link to={`/allMyRentals/${decodedToken?.id}`}><UserOutlined style={{ marginRight: "8px" }} />Kiralama Geçmişim</Link>
    </Menu.Item>
    <Menu.Item key="settings">
      <Link to="/settings"><SettingOutlined style={{ marginRight: "8px" }} />Ayarlar</Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="logout" onClick={handleLogout}>
      <LogoutOutlined style={{ marginRight: "8px" }} />Çıkış Yap
    </Menu.Item>
  </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          background: "black",
        }}
      >
        <div className="logo" style={{ float: "left", width: "35%" }}>
          <Link to="/" style={{ fontSize: "33px", color: "white" }}>
            <span>Extend</span>
            <span style={{ color: "#8C1818" }}>
              <b>Rent</b>
            </span>
          </Link>
        </div>

        <Menu
          mode="horizontal"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            background: "black",
            fontSize: "large",
          }}
        >
          <Menu.Item style={{ color: "white" }} key="home">
            <li className="nav-item nav-item-right">
              <Link to="/">Anasayfa</Link>
            </li>
          </Menu.Item>
          <Menu.Item key="space1" style={{ margin: "0 10px" }}></Menu.Item>
          <Menu.Item style={{ color: "white" }} key="about">
            <li className="nav-item nav-item-right">
              <Link to="/about">Hakkımızda</Link>
            </li>
          </Menu.Item>
          <Menu.Item key="space1" style={{ margin: "0 10px" }}></Menu.Item>
          <Menu.Item style={{ color: "white" }} key="contact">
            <li className="nav-item nav-item-right">
              <Link to="/contact">İletişim</Link>
            </li>
          </Menu.Item>
          <Menu.Item key="space1" style={{ margin: "0 10px" }}></Menu.Item>
          <Menu.Item style={{ color: "white" }} key="admin">
            <li className="nav-item nav-item-right">
              <Link to="/adminPanel">Admin Panel</Link>
            </li>
          </Menu.Item>
          <Menu.Item key="space1" style={{ margin: "0 20px" }}></Menu.Item>
          {!decodedToken?.id && (
          <Menu.Item style={{ color: "white" }} key="login">
            <li className="nav-item nav-item-right">
              <Link to="/login" className="nav-links nav-links-btn">
                Giriş Yap
              </Link>
            </li>
          </Menu.Item>
          )}
          {!decodedToken?.id && (
          <Menu.Item style={{ color: "white" }} key="signup">
            <li className="nav-item nav-item-right">
              <Link to="/signup" className="nav-links nav-links-btn">
                Üye Ol
              </Link>
            </li>
          </Menu.Item>
          )}
          {decodedToken?.id && (
          <Menu.Item key="user" style={{ marginLeft: "20px" }}>
            <Dropdown overlay={menu} trigger={["click"]}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
                style={{ color: "black" }}
              >
                <Avatar size="large" icon={<UserOutlined />} shape="circle" style={{backgroundColor:"gray"}} />
                <DownOutlined />
              </a>
            </Dropdown>
          </Menu.Item>
          )}
        </Menu>
      </Header>

      <Content style={{ padding: "0 16px" }}>
        <div className="site-layout-content">{children}</div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
