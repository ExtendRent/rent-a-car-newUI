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
import MainLayout from "./components/MainLayout/MainLayout";
import SelectedCar from "./pages/SelectedCar/SelectedCar";
import { AllGetByDateCarResponse } from "./models/Responses/Car/AllGetByDateCarResponse";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import CarTable from "./pages/Cars/CarTable";
import CarModelTable from "./pages/CarModel/CarModelTable";
import ColorTable from "./pages/Color/ColorTable";
import DiscountCodeTable from "./pages/DiscountCode/DiscountCodeTable";
import CarBodyTypeTable from "./pages/CarBodyType/CarBodyTypeTable";
import CarSegmentTable from "./pages/CarSegment/CarSegmentTable";
import FuelTypeTable from "./pages/FuelType/FuelTypeTable";
import VehicleStatusTable from "./pages/VehicleStatus/VehicleStatusTable";
import DrivingLicenseTypeTable from "./pages/DrivingLicenseType/DrivingLicenseTypeTable";
import BrandTable from "./pages/Brands/BrandTable";
import Homepage from "./pages/Homepage/Homepage";
import ShiftTypeTable from "./pages/ShiftType/ShiftTypeTable";
import EmployeeTable from "./pages/Employee/EmployeeTable";
import RentalTable from "./pages/Rental/RentalTable";
import UserTable from "./pages/User/UserTable";
import AdminTable from "./pages/Admin/AdminTable";
import PaymentTypeTable from "./pages/PaymentType/PaymentTypeTable";
import PaymentDetailsTable from "./pages/PaymentDetails/PaymentDetailsTable";
import AddCar from "./pages/Cars/AddCar";
import AddCarModel from "./pages/CarModel/AddCarModel";
import AddCarBodyType from "./pages/CarBodyType/AddCarBodyType";
import AddColor from "./pages/Color/AddColor";
import AddDiscountCode from "./pages/DiscountCode/AddDiscountCode";
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
           
              colorTextPlaceholder: "white",
              colorBgContainer: "#121212",
              activeBorderColor: "rgb(126, 4, 10)",
              colorPrimaryHover: "rgb(255, 255, 255)",
              colorText: "rgba(255, 255, 255, 0.93)",
              colorBorder: "#7a7a7a"
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

          },
          Form: {
            labelColor: "rgb(255, 255, 255)"
          },
          Typography: {
            colorTextHeading: "rgba(255, 255, 255, 0.88)",
            colorText: "rgba(255, 255, 255, 0.88)"
          }
        },
        
      }
    }
    >
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" Component={Homepage} />
            <Route path="/about" Component={About}/>
            <Route path="/contact" Component={Contact}/>
            <Route path="/login" Component={Login}/>
            <Route path="/signup" Component={SignUp}/>
            <Route path="/selectedCar" element={<SelectedCar response={searchCarResponse} />} />
            <Route path="/adminPanel" element={<AdminPanel/>}/>
            <Route path="/adminPanel/cars" element={<CarTable/>}/>
            <Route path="/adminPanel/carModels" element={<CarModelTable />}></Route>
            <Route path="/adminPanel/colors" element={<ColorTable />}></Route>
            <Route path="/adminPanel/discountCodes" element={<DiscountCodeTable />}></Route>
            <Route path="/adminPanel/carBodyTypes" element={<CarBodyTypeTable />}></Route>
            <Route path="/adminPanel/carSegments" element={<CarSegmentTable />}></Route>
            <Route path="/adminPanel/fuelTypes" element={<FuelTypeTable />}></Route>
            <Route path="/adminPanel/vehicleStatuses" element={<VehicleStatusTable />}></Route>
            <Route path="/adminPanel/drivingLicenseTypes" element={<DrivingLicenseTypeTable />}></Route>
            <Route path="/adminPanel/brands" element={<BrandTable />}></Route>
            <Route path="/adminPanel/shiftTypes" element={<ShiftTypeTable />}></Route>
            <Route path="/adminPanel/employees" element={<EmployeeTable />}></Route>
            <Route path="/adminPanel/rentals" element={<RentalTable />}></Route>
            <Route path="/adminPanel/users" element={<UserTable />}></Route>
            <Route path="/adminPanel/admins" element={<AdminTable />}></Route>
            <Route path="/adminPanel/paymentTypes" element={<PaymentTypeTable />}></Route>
            <Route path="/adminPanel/paymentDetails" element={<PaymentDetailsTable />}></Route>
            <Route path="/adminPanel/addCar" element={<AddCar />}></Route>
            <Route path="/adminPanel/addCarModel" element={<AddCarModel />}></Route>
            <Route path="/adminPanel/addCarBodyType" element={<AddCarBodyType />}></Route>
            <Route path="/adminPanel/addColor" element={<AddColor />}></Route>
            <Route path="/adminPanel/addDiscountCode" element={<AddDiscountCode />}></Route>
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
