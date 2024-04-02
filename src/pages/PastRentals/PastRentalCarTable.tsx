import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AppDispatch } from "../../store/configureStore";
import { useDispatch } from "react-redux";
import { getRentalsByCustomer } from "../../store/slices/customerSlice";
import { useParams } from "react-router-dom";
import { GetAllCustomerModel } from "../../models/Responses/Customer/GetAllCustomerModel";
import { CustomerModel } from "../../models/Responses/Customer/CustomerModel";
import { RentalModel } from "../../models/Responses/Rental/RentalModel";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { useNavigate } from "react-router-dom";
import { GetAllRentalsModel } from "../../models/Responses/Rental/GetAllRentalsModel";
import Title from "antd/es/typography/Title";
type Props = {};
const PastRentalCarTable = (props: Props) => {
  const { id } = useParams();
  const rentalId = parseInt(id || "");
  const [rental, setRental] = useState<GetAllCustomerModel[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [id]);
  
  const fetchData = async () => {
    const customerRental = await dispatch(getRentalsByCustomer({ customerId: rentalId }));
    if (customerRental.payload) {
      setRental([customerRental.payload as any]); // Döndürülen veriyi dizi içine alarak state'e atayın
      console.log(rental);
    }
  };
  
  
  
  
  const handleUpdate = (id: number) => {
    //navigate(`/myRentalDetails/${id}`);
  };
  const formatDate = (date: string | Date | undefined): string => {
    if (!date) return ""; // Eğer tarih yoksa boş bir dize döndür
    if (typeof date === "string") {
      // Eğer tarih bir string ise, Date nesnesine dönüştür
      date = new Date(date);
    }
    return new Intl.DateTimeFormat("tr-TR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(date);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: "transparent",marginTop:"75px" }}
      className="custom-table-container"
    >
      <Title>Kiralama Geçmişim</Title>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{backgroundColor: "#f5f5dc29",color:"white"}}>
          <TableRow>
            <TableCell align="left" sx={{ color: "white", padding: "0px 50px 0px 50px" }}>
                AD SOYAD
            </TableCell>
            <TableCell align="left" sx={{ color: "white", padding: "0px 50px 0px 50px" }}>
                BAŞLANGIÇ TARİHİ
            </TableCell>
            <TableCell align="left" sx={{ color: "white", padding: "0px 50px 0px 50px" }}>
                BİTİŞ TARİHİ
            </TableCell>
            <TableCell align="left" sx={{ color: "white", padding: "0px 50px 0px 50px" }}>
                DÖNÜŞ TARİHİ
            </TableCell>
            <TableCell align="left" sx={{ color: "white", padding: "0px 50px 0px 50px" }}>
                DURUM
            </TableCell>
            <TableCell align="left" sx={{ color: "white", padding: "0px 50px 0px 50px" }}>
                TUTAR
            </TableCell>
            <TableCell
              align="left"
              sx={{ color: "white", padding: "0px 50px 0px 50px" }}>DETAY</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {rental &&
            rental.map((item, index) => (
                  <span className="table-data">
                    
                  </span>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PastRentalCarTable;
