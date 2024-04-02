import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserModel } from "../../models/Responses/User/UserModel";
import { useAppSelector } from "../../store/useAppSelector";
import { RootState } from "../../store/configureStore";
import {
  changePassword,
  fetchUsers,
  getByIdUser,
} from "../../store/slices/userSlice";
import { useAppDispatch } from "../../store/useAppDispatch";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Alert, Button, Col, Row } from "antd";
import Title from "antd/es/typography/Title";

type Props = {};

const UpdatePassword = (props: Props) => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const userId = parseInt(id ?? "", 10);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.user.error);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Şifre en az 8 hane olmalıdır")
      .max(30, "Şifre en fazla 30 hane olmalıdır")
      .required("Şifre giriniz"),
  });

  const initialValues = {
    id: userId,
    password: "",
  };

  const handleUpdateUser = async (values: any) => {
    try {
      const response = await dispatch(changePassword(values));
      setSuccessMessage("İşlem başarıyla tamamlandı");
      window.location.href = "/adminPanel/users";
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
        <Title style={{ marginLeft: "35%" }}>Şifre Güncelleme</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleUpdateUser(values);
          }}
          enableReinitialize={true}
        >
          <Form>
            <Row gutter={[16, 16]} style={{ justifyContent: "space-around" }}>
              <Col md={8}>
                <Col span={32}>
                  <FormikInput
                    name="password"
                    label="Şifre"
                    placeHolder="Şifre Giriniz."
                    type="text"
                  />
                </Col>
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

export default UpdatePassword;
