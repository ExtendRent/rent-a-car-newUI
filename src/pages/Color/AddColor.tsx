import React, { useState } from "react";
import { RootState } from "../../store/configureStore";
import { addColor } from "../../store/slices/colorSlice";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import { useAppDispatch } from "../../store/useAppDispatch";
import { useAppSelector } from "../../store/useAppSelector";
import { Alert, Button, Col, Row } from "antd";
import Title from "antd/es/typography/Title";

type Props = {};

const AddColor = (props: Props) => {
  const dispatch = useAppDispatch();
  const errorCustom = useAppSelector((state: RootState) => state.color.error);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAddColor = (values: any) => {
    try {
      dispatch(addColor(values));
      setSuccessMessage("İşlem başarıyla tamamlandı");
    } catch (error) {
      console.error("Error updating color: ", error);
      // Hata durumunda
      setErrorMessage("İşlem sırasında bir hata oluştu");
    }
  };
  const validationSchema = Yup.object().shape({
    colorEntityName: Yup.string()
      .min(2, "Renk en az 2 karakter olmalıdır")
      .matches(
        /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
        "Renk sadece harflerden oluşmalıdır"
      )
      .required("Renk Giriniz"),
  });
  const initialValues = {
    colorEntityName: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleAddColor(values);
      }}
    >
      <SideBar>
        <div
          className="container-card"
          style={{ marginTop: "150px", color: "white" }}
        >
          <Title style={{ marginLeft: "35%" }}>Renk Ekleme</Title>
          <Form>
            <Row gutter={[16, 16]} style={{ justifyContent: "space-around" }}>
              <Col md={8}>
                <div style={{ marginBottom: "20px" }}>
                  <FormikInput
                    name="colorEntityName"
                    label="Renk "
                    placeHolder="Renk Giriniz."
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

export default AddColor;
