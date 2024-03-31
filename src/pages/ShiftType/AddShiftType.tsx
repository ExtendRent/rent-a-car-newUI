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
import { addShiftType } from "../../store/slices/shiftTypeSlice";
type Props = {};

const AddShiftType = (props: Props) => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector(
    (state: RootState) => state.shiftType.error
  );

  const handleAddShiftType = async (values: any) => {
    try {
      const response = await dispatch(addShiftType(values));
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
    name: Yup.string()
    .min(2, "Vites Tipi en az 2 karakter olmalıdır")
    .matches(
      /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
      "Vites Tipi sadece harflerden oluşmalıdır"
    )
    .required("Vites Tipi Giriniz"),
  });
  const initialValues = {
    name: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleAddShiftType(values);
      }}
      enableReinitialize={true}
    >
      <SideBar>
        <div
          className="container-card"
          style={{ marginTop: "150px", color: "white" }}
        >
          <div className="form">
            <Title style={{ marginLeft: "35%" }}>Vites Tipi Ekleme</Title>
            <Form>
              <Row gutter={[16, 16]} style={{ justifyContent: "space-around" }}>
                <Col md={8}>
                  <div style={{ marginBottom: "20px" }}>
                    <FormikInput
                      name="name"
                      label="Vites Tipi "
                      placeHolder="Vites Tipi Giriniz."
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

export default AddShiftType;
