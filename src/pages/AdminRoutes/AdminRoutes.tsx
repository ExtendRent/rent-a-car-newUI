import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import AdminCards from "../AdminPanel/AdminCards";
import SideBar from "../../components/Sidebar/SideBar";
import CarTable from "../Cars/CarTable";

type Props = {};

const AdminRoutes = (props: Props) => {
  return (
    <SideBar>
      
      <div>
        <AdminCards />
      </div>
    </SideBar>
  );
};

export default AdminRoutes;
