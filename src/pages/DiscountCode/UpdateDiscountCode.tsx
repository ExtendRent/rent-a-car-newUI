import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/useAppDispatch";
import { useParams } from "react-router";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import FormikInput from "../../components/FormikInput/FormikInput";
import { useAppSelector } from "../../store/useAppSelector";
import { RootState } from "../../store/configureStore";
import { DiscountCodeModel } from "../../models/Responses/DiscountCode/DiscountCodeModel";
import {
  fetchDiscountCodes,
  getByIdDiscountCode,
  updateDiscountCode,
} from "../../store/slices/discountCodeSlice";
import { Alert, Button, Col, Row } from "antd";
import Title from "antd/es/typography/Title";

const UpdateDiscountCode = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const discountCodeId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [discountCode, setDiscountCode] = useState<DiscountCodeModel>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector(
    (state: RootState) => state.discountCode.error
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
        getByIdDiscountCode({ id: discountCodeId })
      );
      setDiscountCode((newResponse as any)?.payload);

      dispatch(fetchDiscountCodes());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
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
    id: discountCodeId,
    discountCode: discountCode?.discountCode,
    discountPercentage: discountCode?.discountPercentage,
  };
  const handleUpdateDiscountCode = async (values: any) => {
    try {
      const response = await dispatch(updateDiscountCode(values));
      setSuccessMessage("İşlem başarıyla tamamlandı");
      window.location.href = "/adminPanel/DiscountCodes";
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
        <Title style={{ marginLeft: "35%" }}>İndirim Kodu Güncelleme</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleUpdateDiscountCode(values);
          }}
          enableReinitialize={true}
        >
          <Form>
            <Row gutter={[16, 16]} style={{ justifyContent: "space-around" }}>
              <Col md={8}>
                <Col span={32}>
                  <FormikInput
                    name="discountCode"
                    label="İndirim Kodu"
                    placeHolder="İndirim Kodu Giriniz."
                    type="text"
                  />
                </Col>
                <Col
                  span={32}
                  style={{ marginTop: "15px"}}
                >
                  <FormikInput
                    name="discountPercentage"
                    label="İndirim Yüzdesi"
                    placeHolder="İndirim Yüzdesi Giriniz"
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

export default UpdateDiscountCode;
