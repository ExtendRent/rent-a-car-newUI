import React, { useState } from "react";
import { RootState } from "../../store/configureStore";
import { addCarBodyType } from "../../store/slices/carBodyTypeSlice";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import { useAppSelector } from "../../store/useAppSelector";
import { useAppDispatch } from "../../store/useAppDispatch";
import Title from "antd/es/typography/Title";
import { Alert, Button, Col, Row } from "antd";
type Props = {};

const AddCarBodyType = (props: Props) => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector(
    (state: RootState) => state.carBodyType.error
  );

  const handleAddCarBodyType = async (values: any) => {
    try {
      const response = await dispatch(addCarBodyType(values));
      // İşlem başarılı olduğunda
      setSuccessMessage("İşlem başarıyla tamamlandı");
      window.location.reload();
    } catch (error) {
      console.error("Error updating shift type: ", error);
      // Hata durumunda
      setErrorMessage("İşlem sırasında bir hata oluştu");
    }
  };
  const validationSchema = Yup.object().shape({
    carBodyTypeEntityName: Yup.string()
      .min(2, "Kasa Tipi en az 2 karakter olmalıdır")
      .matches(
        /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
        "Kasa Tipi sadece harflerden oluşmalıdır"
      )
      .required("Kasa Tipi Giriniz"),
  });
  const initialValues = {
    carBodyTypeEntityName: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleAddCarBodyType(values);
      }}
      enableReinitialize={true}
    >
      <SideBar>
        <div
          className="container-card"
          style={{ marginTop: "150px", color: "white" }}
        >
          <div className="form">
            <Title style={{ marginLeft: "35%" }}>Kasa Tipi Ekleme</Title>
            <Form>
              <Row gutter={[16, 16]} style={{ justifyContent: "space-around" }}>
                <Col md={8}>
                  <div style={{ marginBottom: "20px" }}>
                    <FormikInput
                      name="carBodyTypeEntityName"
                      label="Kasa Tipi "
                      placeHolder="Kasa Tipi Giriniz."
                      type="text"
                    />
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
                  </div>
                </Col>
              </Row>
            </Form>
            <div
              style={{ width: "236px", marginTop: "20px", marginLeft: "50%" }}
            >
              {errorCustom && <Alert type="error" message={errorCustom} />}
              {!errorCustom && successMessage && (
                <Alert type="success" message={successMessage} />
              )}
            </div>
          </div>
        </div>
      </SideBar>
    </Formik>
  );
};

export default AddCarBodyType;
