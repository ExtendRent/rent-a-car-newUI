import React from "react";
import { AddShowRentalResponse } from "../../models/Responses/Rental/AddShowRentalResponse";
import { Typography, Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import "./RentalDetail.css";

const { Title, Text } = Typography;

const RentalDetail: React.FC<{
  response: AddShowRentalResponse | undefined;
  onPaymentProcessClick: () => void;
  lastAmount: number | undefined;
}> = ({ response, onPaymentProcessClick, lastAmount }) => {
  return (
    <div className="form-rental-detail">
      <div
        style={{
          padding: "24px",
          borderRadius: "10px",
          boxShadow: "rgb(234 0 0) 0px 0px 10px",
          minHeight: "450px"
          
        }}
      >
        <Title
          level={2}
          style={{ textAlign: "center", marginBottom: "20px", color: "black" }}
        >
          Sipariş Detayları
        </Title>
        {response ? (
          <Row gutter={[16, 16]} justify="center" style={{marginLeft:"126px"}}>
            <Col xs={24} md={24}>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Title level={4} style={{ color: "#7e040a" }}>
                    Müşteri Bilgileri:
                  </Title>

                  <div style={{ display: "flex" }}>
                    {/* Container for <strong> elements */}
                    <div style={{ marginRight: "10px" }}>
                      <strong style={{ color: "black" }}>Ad:</strong>
                      <br />
                      <strong style={{ color: "black" }}>Soyad:</strong>
                      <br />
                      <strong style={{ color: "black" }}>Mail Adresi:</strong>
                      <br />
                      <strong style={{ color: "black" }}>
                        Telefon Numarası:
                      </strong>
                      <br />
                    </div>
                    {/* Container for <span> elements */}
                    <div>
                      <span style={{ color: "black" }}>
                        {response.response.customerResponse?.name}
                      </span>
                      <br />
                      <span style={{ color: "black"}}>
                        {response.response.customerResponse?.surname}
                      </span>
                      <br />
                      <span style={{ color: "black" }}>
                        {response.response.customerResponse?.emailAddress}
                      </span>
                      <br />
                      <span style={{ color: "black" }}>
                        {response.response.customerResponse?.phoneNumber}
                      </span>
                      <br />
                    </div>
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <Title level={4} style={{ color: "#7e040a" }}>
                    Araç Bilgileri:
                  </Title>
                  <div style={{ display: "flex" }}>
                    {/* Container for <strong> elements */}
                    <div style={{ marginRight: "10px" }}>
                      <strong>Marka:</strong>
                      <br />
                      <strong>Model:</strong>
                      <br />
                      <strong>Tip:</strong>
                      <br />

                      <strong>Yakıt Tipi:</strong>
                      <br />
                    </div>
                    {/* Container for <span> elements */}
                    <div>
                      <span style={{ color: "black" }}>
                        {
                          response.response.carResponse
                            ?.carModelEntityBrandEntityName
                        }
                      </span>{" "}
                      <br />
                      <span style={{ color: "black" }}>
                        {response.response.carResponse?.carModelEntityName}
                      </span>{" "}
                      <br />
                      <span style={{ color: "black" }}>
                        {response.response.carResponse?.carBodyTypeEntityName}
                      </span>{" "}
                      <br />
                      <span style={{ color: "black" }}>
                        {response.response.carResponse?.fuelTypeEntityName}
                      </span>{" "}
                      <br />
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={24}>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Title level={4} style={{ color: "#7e040a" }}>
                    Kiralama Tarihleri:
                  </Title>
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "10px" }}>
                      <strong>Başlangıç Tarihi:</strong>
                      <br />
                      <strong>Bitiş Tarihi:</strong>
                      <br />
                    </div>
                    <div>
                      <span style={{ color: "black" }}>
                        {response.response.startDate?.toString()}
                      </span>{" "}
                      <br />
                      <span style={{ color: "black" }}>
                        {response.response.endDate?.toString()}
                      </span>{" "}
                      <br />
                    </div>
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <Title level={4} style={{ color: "#7e040a" }}>
                    Toplam Tutar:
                  </Title>
                  <Text strong style={{ fontSize: "1.5rem", color: "black" }}>
                    {lastAmount} TL
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <Text>Bilgiler yükleniyor...</Text>
        )}
      </div>
    </div>
  );
};

export default RentalDetail;
