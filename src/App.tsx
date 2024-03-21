import React, { useState } from "react";
import {
  Button,
  Card,
  ConfigProvider,
  DatePicker,
  Input,
  Space,
  theme,
} from "antd";
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import MainLayout from "./components/MainLayout/MainLayout";
import SelectedCar from "./pages/SelectedCar/SelectedCar";
import { AllGetByDateCarResponse } from "./models/Responses/Car/AllGetByDateCarResponse";
import Login from "./pages/Login/Login";
function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };
  const [searchCarResponse, setSearchCarResponse] = useState<AllGetByDateCarResponse | undefined>({} as AllGetByDateCarResponse);
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "rgb(126, 4, 10)",
            colorPrimaryHover: "rgb(100, 100, 100)",
            colorPrimaryActive: "rgb(43, 43, 43)",
            algorithm: true, 
          },
          Input: {
            colorPrimary: "#eb2f96",
            algorithm: [theme.darkAlgorithm, theme.compactAlgorithm], // Enable algorithm
            colorBgBase: "pink",
          },
          DatePicker: {
            colorBgElevated: "rgb(81, 80, 80)",
            hoverBorderColor: "rgb(255, 255, 255)",
            colorPrimary: "rgba(226, 226, 226, 0.24)",
            activeBorderColor: "rgb(126, 4, 10)",
            colorTextDisabled: "rgba(255, 255, 255, 0.4)",
            colorTextLightSolid: "rgb(255, 255, 255)",
            colorBgContainer: "#121212",
            colorTextPlaceholder: "white",
            colorTextHeading: "rgba(255, 255, 255, 0.88)",
            colorText: "rgba(255, 255, 255, 0.88)",
            colorBorder: "#7a7a7a"
          
          },
          Layout: {
            colorBgLayout: "black",
            margin:0,
            padding:0,
          
          },
          Card: {
            colorBgContainer: "rgb(123 123 123 / 43%)",
            colorText: "rgba(255, 255, 255, 0.88)",
            colorTextHeading:"rgba(255, 255, 255, 0.88)",
          },
          Select: {
            colorBgContainer: "#121212",
            colorBgElevated: "rgb(81, 80, 80)",
            colorText: "rgba(255, 255, 255, 0.93)",
            colorPrimary: "rgb(126, 4, 10)",
            optionSelectedBg: "rgb(132, 132, 132)",
            selectorBg: "rgb(18, 18, 18)",
            optionActiveBg: "rgba(255, 255, 255, 0.04)",
            colorPrimaryHover: "rgb(255, 255, 255)",
            colorTextPlaceholder: "rgb(255, 255, 255)",
            colorBorder: "#7a7a7a"
          },
          Tabs: {
            inkBarColor: "rgb(126, 4, 10)",
            itemSelectedColor: "rgb(255, 255, 255)",
            itemColor: "rgb(255, 255, 255)",
            colorTextDisabled: "rgb(255, 255, 255)",
            itemHoverColor:"rgb(126, 4, 10) "

          }
        },
        
      }
    }
    >
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" Component={Homepage} />
            <Route path="/about" />
            <Route path="/contact" />
            <Route path="/login" Component={Login}/>
            <Route path="/selectedCar" element={<SelectedCar response={searchCarResponse} />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
