import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { useEffect } from "react";
import { getUserCountIsDeleted } from "../../store/slices/userSlice";
import {
  getCustomerCountByStatus,
  getCustomerCountIsDeleted,
} from "../../store/slices/customerSlice";
import { getEmployeeCountIsDeleted } from "../../store/slices/employeeSlice";
import { getAdminCountIsDeleted } from "../../store/slices/adminSlice";
import {
  getCarCountByStatus,
  getCarCountIsDeleted,
} from "../../store/slices/carSlice";
import {
  getRentalCountByStatus,
  getRentalCountIsDeleted,
} from "../../store/slices/rentalSlice";
import { Space, Card } from "antd";
import { useAppSelector } from "../../store/useAppSelector";
import { useAppDispatch } from "../../store/useAppDispatch";
import { CarOutlined, IdcardOutlined, ShopOutlined, SolutionOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
type Props = {};
const AdminCards = (props: Props) => {
  const dispatch = useAppDispatch();
  const rentalState = useAppSelector((state) => state.rental);
  const carState = useAppSelector((state) => state.car);
  const userState = useAppSelector((state) => state.user);
  const customerState = useAppSelector((state) => state.customer);
  const employeeState = useAppSelector((state) => state.employee);
  const adminState = useAppSelector((state) => state.admin);
  const [userCountIsDeleted, setUserCountIsDeleted] = useState(0);
  const [userCountIsDeletedTrue, setUserCountIsDeletedTrue] = useState(0);
  const [customerPending, setCustomerPending] = useState(0);
  const [customerBlocked, setCustomerBlocked] = useState(0);
  const [customerIsDeleted, setCustomerIsDeleted] = useState(0);
  const [employeeCountIsDeleted, setEmployeeCountIsDeleted] = useState(0);
  const [employeeCountIsDeletedTrue, setEmployeeCountIsDeletedTrue] =
    useState(0);
  const [adminCountIsDeleted, setAdminCountIsDeleted] = useState(0);
  const [adminCountIsDeletedTrue, setAdminCountIsDeletedTrue] = useState(0);
  const [carInUse, setCarInUse] = useState(0);
  const [carMaintenance, setCarMaintenance] = useState(0);
  const [carCountIsDeleted, setCarCountIsDeleted] = useState(0);
  const [rentalActive, setRentalActive] = useState(0);
  const [rentalFinished, setRentalFinished] = useState(0);
  const [rentalCountIsDeleted, setRentalCountIsDeleted] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUserCountIsDeleted: any = await dispatch(
        getUserCountIsDeleted({ deleted: false })
      );
      const fetchedUserCountIsTrue: any = await dispatch(
        getUserCountIsDeleted({ deleted: true })
      );

      const fetchedCustomerPending: any = await dispatch(
        getCustomerCountByStatus({ status: "PENDING_VERIFYING" })
      );
      const fetchedCustomerBlocked: any = await dispatch(
        getCustomerCountByStatus({ status: "BLOCKED" })
      );

      const fetchedCustomerIsDeleted: any = await dispatch(
        getCustomerCountIsDeleted({ deleted: false })
      );

      const fetchedEmployeeCountIsDeleted: any = await dispatch(
        getEmployeeCountIsDeleted({ deleted: false })
      );
      const fetchedEmployeeCountIsTrue: any = await dispatch(
        getEmployeeCountIsDeleted({ deleted: true })
      );

      const fetchedAdminCountIsDeleted: any = await dispatch(
        getAdminCountIsDeleted({ deleted: false })
      );
      const fetchedAdminCountIsTrue: any = await dispatch(
        getAdminCountIsDeleted({ deleted: true })
      );

      const fetchedCarInUse: any = await dispatch(
        getCarCountByStatus({ statusId: 1 })
      );
      const fetchedCarMaintenance: any = await dispatch(
        getCarCountByStatus({ statusId: 2 })
      );
      const fetchedCarCountIsDeleted: any = await dispatch(
        getCarCountIsDeleted({ deleted: false })
      );

      const fetchedRentalActive: any = await dispatch(
        getRentalCountByStatus({ status: 1 })
      );
      const fetchedRentalFinished: any = await dispatch(
        getRentalCountByStatus({ status: 2 })
      );
      const fetchedRentalCountIsDeleted: any = await dispatch(
        getRentalCountIsDeleted({ deleted: false })
      );

      setUserCountIsDeleted(
        fetchedUserCountIsDeleted.payload.response as number
      );
      setUserCountIsDeletedTrue(
        fetchedUserCountIsTrue.payload.response as number
      );

      setCustomerPending(fetchedCustomerPending.payload.response as number);
      setCustomerBlocked(fetchedCustomerBlocked.payload.response as number);
      setCustomerIsDeleted(fetchedCustomerIsDeleted.payload.response as number);

      setEmployeeCountIsDeleted(
        fetchedEmployeeCountIsDeleted.payload.response as number
      );
      setEmployeeCountIsDeletedTrue(
        fetchedEmployeeCountIsTrue.payload.response as number
      );

      setAdminCountIsDeleted(
        fetchedAdminCountIsDeleted.payload.response as number
      );
      setAdminCountIsDeletedTrue(
        fetchedAdminCountIsTrue.payload.response as number
      );

      setCarInUse(fetchedCarInUse.payload.response as number);
      setCarMaintenance(fetchedCarMaintenance.payload.response as number);
      setCarCountIsDeleted(fetchedCarCountIsDeleted.payload.response as number);

      setRentalActive(fetchedRentalActive.payload.response as number);
      setRentalFinished(fetchedRentalFinished.payload.response as number);
      setRentalCountIsDeleted(
        fetchedRentalCountIsDeleted.payload.response as number
      );
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <Space
        size={[16, 16]}
        wrap
        style={{
          marginTop: "150px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Card
        
        title={<span style={{ fontSize: "18px", fontWeight: "bold" }}> <UserOutlined /> Kullanıcılar</span>}
        style={{
          width: 300,
          height: "250px",
          backgroundColor: "#ffffff21",
          boxShadow: "0px 0px 4px 4px rgb(193 32 32 / 82%)",
        }}
        headStyle={{ backgroundColor: "rgb(120 120 120 / 48%)" }}
        >
          <p>Aktif Kullanıcılar: {userCountIsDeleted}</p>
          <p>Silinen Kullanıcılar: {userCountIsDeletedTrue}</p>
        </Card>
        <Card
          title={<span style={{ fontSize: "18px", fontWeight: "bold" }}> <ShopOutlined /> Müşteriler</span>}  
          style={{
            width: 300,
            height: "250px",
            backgroundColor: "#ffffff21",
            boxShadow: "rgb(189 193 32 / 82%) 0px 0px 4px 4px",
          }}
          headStyle={{ backgroundColor: "rgb(120 120 120 / 48%)" }}
        >
          <p>Onay Bekleyenler: {customerPending}</p>
          <p>Engellenenler: {customerBlocked}</p>
          <p>Mevcut: {customerIsDeleted}</p>
        </Card>
        <Card
          title={<span style={{ fontSize: "18px", fontWeight: "bold" }}><TeamOutlined  /> Çalışanlar</span>}
          style={{
            width: 300,
            height: "250px",
            backgroundColor: "#ffffff21",
            boxShadow: "rgb(32 154 193 / 82%) 0px 0px 4px 4px",
          }}
          headStyle={{ backgroundColor: "rgb(120 120 120 / 48%)" }}
        >
          <p>Aktif Kullanıcılar: {employeeCountIsDeleted}</p>
          <p>Silinen Kullanıcılar: {employeeCountIsDeletedTrue}</p>
        </Card>
      </Space>
      <Space
        size={[16, 16]}
        wrap
        style={{
          marginTop: "150px",
          display: "flex",
          justifyContent: "space-around",
        }}
        
      >
        <Card
          title={<span style={{ fontSize: "18px", fontWeight: "bold" }}><SolutionOutlined   /> Admin</span>}
          style={{
            width: 300,
            height: "250px",
            backgroundColor: "#ffffff21",
            boxShadow: "rgb(110 32 193 / 82%) 0px 0px 4px 4px",
          }}
          headStyle={{ backgroundColor: "rgb(120 120 120 / 48%)" }}
        >
          <p>Aktif Kullanıcılar: {adminCountIsDeleted}</p>
          <p>Silinenler: {adminCountIsDeletedTrue}</p>
        </Card>
        <Card
          title={<span style={{ fontSize: "18px", fontWeight: "bold" }}><CarOutlined /> Araç</span>}
          style={{
            width: 300,
            height: "250px",
            backgroundColor: "#ffffff21",
            boxShadow: "rgb(32 193 187 / 82%) 0px 0px 4px 4px",
          }}
          headStyle={{ backgroundColor: "rgb(120 120 120 / 48%)" }}
        >
          <p>Kullanımda: {carInUse}</p>
          <p>Bakımda: {carMaintenance}</p>
          <p>Mevcut: {carCountIsDeleted}</p>
        </Card>
        <Card
          title={<span style={{ fontSize: "18px", fontWeight: "bold" }}><IdcardOutlined    /> Kiralama</span>}
          style={{
            width: 300,
            height: "250px",
            backgroundColor: "#ffffff21",
            boxShadow: "rgb(193 100 32 / 82%) 0px 0px 4px 4px",
          }}
          headStyle={{ backgroundColor: "rgb(120 120 120 / 48%)" }}
        >
          <p>Aktif: {rentalActive}</p>
          <p>Tamamlanan: {rentalFinished}</p>
          <p>Mevcut: {rentalCountIsDeleted}</p>
        </Card>
      </Space>
    </div>
  );
};

export default AdminCards;
