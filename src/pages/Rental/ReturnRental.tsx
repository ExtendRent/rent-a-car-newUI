import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRentals, returnRental } from "../../store/slices/rentalSlice";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/useAppDispatch";
import Title from "antd/es/typography/Title";
import { Button, Col, DatePicker, Input, Row } from "antd";
import SideBar from "../../components/Sidebar/SideBar";

type Props = {};

const ReturnRental = (props: Props) => {
  const dispatch = useAppDispatch();
  const rentalState = useSelector((state: any) => state.rental);

  const { id } = useParams();
  const rentalId = parseInt(id || "");

  const [endDate, setEndDate] = useState("");
  const [endKilometer, setEndKilometer] = useState(0);

  useEffect(() => {
    dispatch(fetchRentals());
  }, [dispatch]);

  const handlePaymentTypeUpdateSuccess = () => {
    dispatch(
      returnRental({
        returnDate: endDate,
        id: rentalId,
        endKilometer: endKilometer,
      })
    );
    handleCancelUpdate();
    //window.location.href = "/adminPanel/rentals";
  };

  const handleCancelUpdate = () => {
    setEndDate("");
    setEndKilometer(0);
    dispatch(fetchRentals());
  };

  return (
    <SideBar>
      <div
        className="container-card"
        style={{ marginTop: "150px", color: "white" }}
      >
        <Title style={{ marginLeft: "35%" }}>Kiralamayı Tamamla</Title>
        <Row gutter={[16, 16]} style={{ justifyContent: "space-around" }}>
          <Col md={8}>
            <Col span={32}>
              <p>
                <label htmlFor="endDate">Bitiş Günü:</label>
              </p>
              
              <DatePicker
                  format="DD-MM-YYYY"
                  placeholder="Dönüş Tarihi"
                  style={{
                    width: "350px",
                    height: "40px",
                    marginBottom: "50px",
                  }}
                  onChange={(date) => setEndDate(date ? date.format("YYYY-MM-DD") : "")}
                  
                />
            </Col>

            <Col span={32} style={{ marginTop: "15px" }}>
              <p>
                <label htmlFor="endKilometer">Güncel km:</label>
              </p>
              <Input
                type="number"
                id="endKilometer"
                value={endKilometer}
                style={{width:"78%"}}
                onChange={(e) => setEndKilometer(parseInt(e.target.value))}
              />
            </Col>
            <Col span={32} style={{ marginTop: "15px" }}>
              <Button
                style={{
                  marginTop: "30px",
                  backgroundColor: "rgb(140,24,24)",
                  color: "white",
                  width: "200px",
                  borderRadius: "10px",
                  marginLeft: "86px",
                }}
                onClick={handlePaymentTypeUpdateSuccess}
              >
                Kiralamayı Bitir
              </Button>
              <Button 
                style={{
                  marginTop: "30px",
                  backgroundColor: "rgb(140,24,24)",
                  color: "white",
                  width: "200px",
                  borderRadius: "10px",
                  marginLeft: "86px",
                }}
                onClick={handleCancelUpdate}>
                İptal
              </Button>
            </Col>
          </Col>
        </Row>
      </div>
    </SideBar>
  );
};

export default ReturnRental;
