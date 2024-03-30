import React, { useState } from "react";
import { RootState } from "../../store/configureStore";
import { addDiscountCode } from "../../store/slices/discountCodeSlice";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import { useAppDispatch } from "../../store/useAppDispatch";
import { useAppSelector } from "../../store/useAppSelector";
import { Alert, Button, Col, Row } from "antd";
import Title from "antd/es/typography/Title";

type Props = {};

const AddDiscountCode = (props: Props) => {
  const dispatch = useAppDispatch();
  const errorCustom = useAppSelector(
    (state: RootState) => state.discountCode.error
  );
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAddDiscountCode = (values: any) => {
    dispatch(addDiscountCode(values));
  };
  const validationSchema = Yup.object().shape({
    discountCode: Yup.string()
      .matches(/^[a-zA-Z0-9]+$/, "Sadece harf ve rakamlardan oluşmalıdır")
      .required("İndirim kodu gerekli"),
    discountPercentage: Yup.number()
      .min(5, "İndirim oranı en az 5 olmalıdır")
      .max(90, "İndirim oranı en fazla 90 olmalıdır")
      .typeError("Sadece sayılar kabul edilir")
      .required("İndirim oranı gerekli"),
  });
  const initialValues = {
    discountCode: "",
    discountPercentage: 0,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleAddDiscountCode(values);
      }}
      enableReinitialize={true}
    >
      <SideBar>
        <div
          className="container-card"
          style={{ marginTop: "150px", color: "white" }}
        >
          <Title style={{ marginLeft: "35%" }}>İndirim Kodu Ekleme</Title>
          <Form>
            <Row gutter={[16, 16]} style={{ justifyContent: "space-around" }}>
              <Col md={8}>
                <div style={{ marginBottom: "20px" }}>
                  <FormikInput
                    name="discountCode"
                    label="İndirim Kodu "
                    placeHolder="İndirim Kodu Giriniz"
                    type="text"
                  />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <FormikInput
                    name="discountPercentage"
                    label="İndirim Oranı "
                    placeHolder="İndirim Oranı Giriniz."
                    type="number"
                  />
                  </div>
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
                    Ekle
                  </Button>
               
              </Col>
            </Row>
          </Form>
          <div style={{ width: "236px", marginTop: "20px", marginLeft: "50%" }}>
            {errorCustom && <Alert type="error" message={errorCustom} />}
            {!errorCustom && successMessage && (
              <Alert type="success" message={successMessage} />
            )}
          </div>
        </div>
      </SideBar>
    </Formik>
  );
};

export default AddDiscountCode;
