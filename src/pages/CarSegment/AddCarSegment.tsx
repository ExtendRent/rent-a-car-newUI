import React, { useState } from 'react'
import { AppDispatch, RootState } from '../../store/configureStore';
import { addCarSegment } from '../../store/slices/carSegmentSlice';
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import { useAppDispatch } from '../../store/useAppDispatch';
import { useAppSelector } from '../../store/useAppSelector';
import { Alert, Button, Col, Row } from 'antd';

type Props = {}

const AddCarSegment = (props: Props) => {

  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector(
    (state: RootState) => state.carSegment.error
  );

  const handleAddCarSegment = (values: any) => {
    try {
      dispatch(addCarSegment(values));
      setSuccessMessage("İşlem başarıyla tamamlandı");
    } catch (error) {
      console.error("Error updating car segment: ", error);
      // Hata durumunda
      setErrorMessage("İşlem sırasında bir hata oluştu");
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Segment en az 2 karakter olmalıdır")
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, "Segment sadece harflerden oluşmalıdır")
      .required("Segment Giriniz"),
  });

  const initialValues = {
    name: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleAddCarSegment(values);
      }}
      enableReinitialize={true}
    >
      <SideBar>
        <div className="container-card">
          <div className="form">
            <h2 className="h2-card">Segment Ekleme</h2>
            <Form>
              <Row gutter={[16, 16]} style={{ justifyContent: "space-around" }}>
                <Col md={8}>
                  <div style={{ marginBottom: "20px" }}>
                    <FormikInput
                      name="name"
                      label="Segment "
                      placeHolder="Segment Giriniz."
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
  )
}

export default AddCarSegment