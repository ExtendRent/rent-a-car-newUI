import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { ReactNode, useState } from "react";
import "./MainLayout.css"; // CSS dosyasını burada içeri aktarın

const { Header, Content, Footer } = Layout;

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [selectedKey, setSelectedKey] = useState<string>("1"); // Başlangıçta seçili menü öğesinin key'i

  const handleMenuSelect = (e: { key: React.Key }) => {
    // e parametresinin türü belirtiliyor
    setSelectedKey(e.key as string); // Menü öğesi seçildiğinde state'i güncelle
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" ,background:"black"}}>
         <div className="logo" style={{ float: "left", width: "35%" }}>
            <Link to="/" style={{ fontSize: "33px", color: "white" }}>
              <span>Extend</span>
              <span style={{ color: "#8C1818" }}>
                <b>Rent</b>
              </span>
            </Link>
          </div>
  
        <Menu mode="horizontal" style={{display: "flex",justifyContent: "flex-end",background:"black",fontSize: "large"}}>
          {/* <Menu.Item key="logo">Logo</Menu.Item> */}
          <Menu.Item style={{color:"white"}} key="home">Home</Menu.Item>
          <Menu.Item key="space1" style={{ margin: "0 10px" }}></Menu.Item>
          <Menu.Item style={{color:"white"}} key="about">About Us</Menu.Item>
          <Menu.Item  key="space1" style={{ margin: "0 10px" }}></Menu.Item>
          <Menu.Item style={{color:"white"}} key="contact">Contact</Menu.Item>
          <Menu.Item  key="space1" style={{ margin: "0 20px" }}></Menu.Item>
          <Menu.Item style={{color:"white"}} key="login">
            <li className='nav-item nav-item-right'>
              <Link to='/login' className='nav-links nav-links-btn'>
                Giriş Yap
              </Link>
            </li>
          </Menu.Item>
          <Menu.Item style={{color:"white"}} key="signup">
            <li className='nav-item nav-item-right'>
              <Link to='/signup' className='nav-links nav-links-btn'>
                Üye Ol
              </Link>
            </li>
          </Menu.Item>
          
        </Menu>
      </Header>

      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">{children}</div>
      </Content>

      {/* <Footer
        style={{ width: "100%", textAlign: "center", backgroundColor: "pink" }}
      >
        Ant Design ©2022 Created by Ant UED
      </Footer> */}
    </Layout>
  );
};

export default MainLayout;
