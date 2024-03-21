import React, { useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import { DatePicker, Button, Row, Col, Alert } from "antd";
import { useAppDispatch } from "../../store/useAppDispatch";
import { AllGetByDateCarResponse } from "../../models/Responses/Car/AllGetByDateCarResponse";
import { getByAllFilteredCars } from "../../store/slices/carSlice";
import { useAppSelector } from "../../store/useAppSelector";
import { RootState } from "../../store/configureStore";
import wheelIcon from "../../assets/images/steering-wheel.png";
import "./Search.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchCarResponse, setSearchCarResponse] = useState<
    AllGetByDateCarResponse | undefined
  >();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.car.error);
  const [successMessage, setSuccessMessage] = useState<string>("");
  return (
    <Row justify="center" style={{ marginTop: "2rem" }}>
      <Col xs={24} lg={16}>
        <Formik
          initialValues={{
            startDate: "",
            endDate: "",
          }}
          onSubmit={async (values) => {
            const { startDate, endDate } = values;
          
            try {
              if (!endDate) {
                setErrorMessage("Bitiş tarihini seçiniz.");
                return;
              }
              if (!startDate) {
                setErrorMessage("Başlangıç tarihini seçiniz.");
                return;
              }
            
              
              if (endDate < startDate) {
                setErrorMessage(
                  "Başlangıç tarihinden önce bir tarih seçemezsiniz."
                );
                return;
              }
              const formattedStartDate = moment(startDate, "DD-MM-YYYY").format("YYYY-MM-DD");
              const formattedEndDate = moment(endDate, "DD-MM-YYYY").format("YYYY-MM-DD");
          
              const response = await dispatch(
                getByAllFilteredCars({
                  startDate: formattedStartDate,
                  endDate: formattedEndDate,
                })
              );

              if (response.payload) {
                setSearchCarResponse(
                  response.payload as AllGetByDateCarResponse
                );
              }
              navigate(`/selectedCar`, {
                state: { startDate: formattedStartDate, endDate: formattedEndDate },
              });
            } catch (error) {
              console.error("Redux action dispatch hatası:", error);
              setErrorMessage("İşlem başarısız. Lütfen tekrar deneyin.");
            }
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col span={36} lg={36}>
                  <label className="search-label text-fadeInUpFast">
                    Başlama Tarihi
                  </label>
                  <Field name="startDate">
                    {({ form }: FieldProps) => (
                      <DatePicker
                        format="DD-MM-YYYY"
                        placeholder="Başlama Tarihi"
                        style={{
                          width: "350px",
                          height: "40px",
                          marginTop: "20px",
                          marginBottom: "30px",
                        }}
                        onChange={(date) => {
                          form.setFieldValue("startDate", date ? date.format("DD-MM-YYYY") : "");
                        }}
                        disabledDate={(current) => current && current < moment()}
                      />
                    )}
                  </Field>
                </Col>
                <Col span={36} lg={36}>
                  <label className="search-label text-fadeInUpFast">
                    Dönüş Tarihi
                  </label>
                  <Field name="endDate">
                    {({ field }: FieldProps) => (
                      <Field name="endDate">
                        {({ field, form }: FieldProps) => (
                          <DatePicker
                            format="DD-MM-YYYY"
                            placeholder="Dönüş Tarihi"
                            style={{
                              width: "350px",
                              height: "40px",
                              marginTop: "20px",
                              marginBottom: "50px",
                            }}
                            onChange={(date) => {
                              form.setFieldValue("endDate", date ? date.format("DD-MM-YYYY") : "");
                            }}
                            disabledDate={(current) => current && current < moment()}
                          />
                        )}
                      </Field>
                    )}
                  </Field>
                </Col>
              </Row>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <button type="submit" className="search-button">
                  Tarihe Göre Ara
                  <img className="wheelIcon" src={wheelIcon} alt="wheel" />
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Col>
        <div style={{ width: "236px",marginTop:"20px",marginLeft:"36px"}}>
        {errorCustom && <Alert type="warning" message={errorCustom} showIcon />}
        {errorMessage && <Alert type="error" message={errorMessage} showIcon />}
        {!errorCustom && successMessage && (
          <Alert type="success" message={successMessage} />
        )}
        </div>
    </Row>
  );
};

export default Search;
