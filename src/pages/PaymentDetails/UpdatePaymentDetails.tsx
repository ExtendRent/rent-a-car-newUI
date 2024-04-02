import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/useAppDispatch";
import { useParams } from "react-router";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import FormikInput from "../../components/FormikInput/FormikInput";
import SideBar from "../../components/Sidebar/SideBar";
import { PaymentDetailsModel } from "../../models/Responses/PaymentDetails/PaymentDetailsModel";
import { useAppSelector } from "../../store/useAppSelector";
import { RootState } from "../../store/configureStore";
import {
  fetchPaymentDetails,
  getByIdPaymentDetails,
  updatePaymentDetails,
} from "../../store/slices/paymentDetailsSlice";
import Title from "antd/es/typography/Title";
import { Alert, Button, Col, Row } from "antd";

type Props = {};

const UpdatePaymentDetails = (props: Props) => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const paymentDetailsId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsModel>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector(
    (state: RootState) => state.paymentDetails.error
  );

  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(
        getByIdPaymentDetails({ id: paymentDetailsId })
      );
      setPaymentDetails((newResponse as any)?.payload);

      dispatch(fetchPaymentDetails());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const validationSchema = Yup.object().shape({
    amount: Yup.number().required("Ödeme tutarı boş geçilemez."),
  });

  const initialValues = {
    id: paymentDetailsId,
    amount: paymentDetails?.amount,
  };

  const handleUpdatePaymentDetails = async (values: any) => {
    try {
      const response = await dispatch(updatePaymentDetails(values));
      setSuccessMessage("İşlem başarıyla tamamlandı");
      window.location.href = "/adminPanel/paymentDetails";
    } catch (error) {
      console.error("Error updating shift type: ", error);
      // Hata durumunda
      setErrorMessage("İşlem sırasında bir hata oluştu");
    }
  };

  return (
    <SideBar>
      <div
        className="container-card"
        style={{ marginTop: "150px", color: "white" }}
      >
        <Title style={{ marginLeft: "35%" }}>Fatura Güncelleme</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleUpdatePaymentDetails(values);
          }}
          enableReinitialize={true}
        >
          <Form>
            <Row gutter={[16, 16]} style={{ justifyContent: "space-around" }}>
              <Col md={8}>
                <Col span={32}>
                  <FormikInput
                    name="amount"
                    label="Ödeme Tutarı"
                    placeHolder="Ödeme Tutarı Giriniz."
                    type="number"
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

export default UpdatePaymentDetails;
