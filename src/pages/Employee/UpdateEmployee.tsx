import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/useAppDispatch";
import { useParams } from "react-router";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import FormikInput from "../../components/FormikInput/FormikInput";
import { EmployeeModel } from "../../models/Responses/Employee/EmployeeModel";
import { useAppSelector } from "../../store/useAppSelector";
import { RootState } from "../../store/configureStore";
import {
  fetchEmployees,
  getByIdEmployee,
  updateEmployee,
} from "../../store/slices/employeeSlice";
import { Alert, Button, Col, Row } from "antd";
import Title from "antd/es/typography/Title";

type Props = {};

const UpdateEmployee = (props: Props) => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const employeeId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [employee, setEmployee] = useState<EmployeeModel>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector(
    (state: RootState) => state.employee.error
  );

  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(getByIdEmployee({ id: employeeId }));
      setEmployee((newResponse as any)?.payload);

      dispatch(fetchEmployees());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(
        /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
        "İsim sadece harflerden oluşmalıdır"
      )
      .required("İsim giriniz"),
    surname: Yup.string()
      .matches(
        /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
        "Soyisim sadece harflerden oluşmalıdır"
      )
      .required("Soyisim giriniz"),
    emailAddress: Yup.string().required("Mail Adresi Giriniz"),
    password: Yup.string()
      .required("Şifre Giriniz")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Şifre en az 8 karakter uzunluğunda olmalı, en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir"
      ),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Telefon numarası sadece sayılardan oluşmalıdır")
      .min(10, "Telefon numarası 10 hane olmalıdır")
      .max(10, "Telefon numarası 10 hane olmalıdır")
      .required("Telefon numarası giriniz"),
    salary: Yup.number()
      .min(0, "Maaş en az 0 olmalıdır")
      .required("Maaş giriniz"),
  });
  const initialValues = {
    id: employeeId,
    name: employee?.name,
    surname: employee?.surname,
    emailAddress: employee?.email,
    password: "",
    phoneNumber: "",
    salary: employee?.salary,
    imagePath: "",
    authority: employee?.authority,
  };

  const handleUpdateEmployee = async (values: any) => {
    try {
      const response = await dispatch(updateEmployee(values));
      setSuccessMessage("İşlem başarıyla tamamlandı");
    } catch (error) {
      console.error("Error updating discount code: ", error);
      setErrorMessage("İşlem sırasında bir hata oluştu");
    }
  };

  return (
    <SideBar>
      <div
        className="container-card"
        style={{ marginTop: "150px", color: "white" }}
      >
        <Title style={{ marginLeft: "35%" }}>Çalışan Güncelleme</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleUpdateEmployee(values);
          }}
          enableReinitialize={true}
        >
          <Form>
            <Row gutter={[16, 16]} style={{ justifyContent: "space-around" }}>
              <Col md={8}>
                <Col span={32}>
                  <FormikInput
                    name="name"
                    label="Ad"
                    placeHolder="Çalışan Adı Giriniz."
                    type="text"
                  />
                </Col>
                <Col span={32} style={{ marginTop: "15px" }}>
                  <FormikInput
                    name="surname"
                    label="Soyad"
                    placeHolder="Soyadı Giriniz"
                    type="text"
                  />
                </Col>
                <Col span={32} style={{ marginTop: "15px" }}>
                  <FormikInput
                    name="emailAddress"
                    label="email"
                    placeHolder="Mail Adresi Giriniz"
                    type="text"
                  />
                </Col>
                <Col span={32} style={{ marginTop: "15px" }}>
                  <FormikInput
                    name="password"
                    label="Şifre"
                    placeHolder="Şifre Giriniz"
                    type="text"
                  />
                </Col>
                <Col span={32} style={{ marginTop: "15px" }}>
                  <FormikInput
                    name="phoneNumber"
                    label="Telefon"
                    placeHolder="Telefon Giriniz"
                    type="text"
                  />
                </Col>
                <Col span={32} style={{ marginTop: "15px" }}>
                  <FormikInput
                    name="salary"
                    label="Maaş"
                    placeHolder="Maaş Giriniz"
                    type="number"
                  />
                </Col>
                {/* <Col span={32} style={{ marginTop: "15px" }}>
                  <FormikInput
                    name="authority"
                    label="Yetki"
                    placeHolder="Yetki Giriniz"
                    type="text"
                  />
                </Col> */}
                <Col
                  span={32}
                  style={{ marginTop: "15px", marginLeft: "100px" }}
                >
                  <Button
                    style={{
                      marginTop: "30px",
                      backgroundColor: "rgb(140,24,24)",
                      color: "white",
                      width: "200px",
                      borderRadius: "10px",
                      marginLeft: "140px",
                    }}
                    htmlType="submit"
                  >
                    Güncelle
                  </Button>
                </Col>
                <Col
                  span={32}
                  style={{ marginTop: "15px", marginLeft: "100px" }}
                >
                  {errorCustom && (
                    <Alert type="warning" message={errorCustom} showIcon />
                  )}
                  {errorMessage && (
                    <Alert type="error" message={errorMessage} showIcon />
                  )}
                  {!errorCustom && successMessage && (
                    <Alert type="success" message={successMessage} />
                  )}
                </Col>
              </Col>
            </Row>
          </Form>
        </Formik>
      </div>
    </SideBar>
  );
};

export default UpdateEmployee;
