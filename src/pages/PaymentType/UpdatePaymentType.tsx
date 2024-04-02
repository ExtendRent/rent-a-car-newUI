import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useAppDispatch } from "../../store/useAppDispatch";
import { useParams } from "react-router";
import FormikInput from "../../components/FormikInput/FormikInput";
import SideBar from "../../components/Sidebar/SideBar";
import { RootState } from "../../store/configureStore";
import { useAppSelector } from "../../store/useAppSelector";
import { PaymentTypeModel } from "../../models/Responses/PaymentType/PaymentTypeModel";
import {
  fetchPaymentTypes,
  getByIdPaymentType,
  updatePaymentType,
} from "../../store/slices/paymentTypeSlice";
import FormikCheckbox from "../../components/FormikCheckbox/FormikCheckbox";
import Title from "antd/es/typography/Title";
import { Alert, Button, Col, Row } from "antd";

const UpdatePaymentType = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const paymentTypeId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [paymentType, setPaymentType] = useState<PaymentTypeModel>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector(
    (state: RootState) => state.paymentType.error
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
        getByIdPaymentType({ id: paymentTypeId })
      );
      setPaymentType((newResponse as any)?.payload);

      dispatch(fetchPaymentTypes());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Ödeme tipi giriniz.")
      .min(2, "Ödeme tipi en az 2 karakter olmalıdır")
      .max(20, "Ödeme tipi en fazla 20 karakter olmalıdır")
      .matches(
        /^[\sa-zA-ZğüşıöçĞÜŞİÖÇ]*$/,
        "Ödeme tipi sadece harflerden oluşmalıdır"
      ),
    active: Yup.boolean(),
  });

  const initialValues = {
    id: paymentTypeId,
    name: paymentType?.name,
    active: paymentType?.active,
  };

  const handleUpdatePaymentType = async (values: any) => {
    try {
      const response = await dispatch(updatePaymentType(values));
      setSuccessMessage("İşlem başarıyla tamamlandı");
      window.location.href = "/adminPanel/paymentTypes";
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
        <Title style={{ marginLeft: "35%" }}>Ödeme Tipi Güncelleme</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleUpdatePaymentType(values);
          }}
          enableReinitialize={true}
        >
          <Form>
            <Row gutter={[16, 16]} style={{ justifyContent: "space-around" }}>
              <Col md={8}>
                <Col span={32}>
                  <FormikInput
                    name="name"
                    label="Ödeme Tipi"
                    placeHolder="Ödeme Tipi Giriniz."
                    type="text"
                  />
                </Col>
                <Col span={32} style={{ marginTop: "15px" }}>
                  <FormikCheckbox name="active" label="Ödeme Tipi Aktif mi?" />
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

export default UpdatePaymentType;
