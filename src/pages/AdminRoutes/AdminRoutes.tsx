import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import AdminCards from "../AdminPanel/AdminCards";
import SideBar from "../../components/Sidebar/SideBar";

type Props = {};

const AdminRoutes = (props: Props) => {
  return (
    <SideBar>
      <Routes>
        <Route path="/adminPanel/cars" element={<Login />}></Route>
      </Routes>
      <div>
        <AdminCards />
      </div>
    </SideBar>
  );
};

export default AdminRoutes;
