import React, { useEffect, useState } from "react";
import {  RootState } from "../../store/configureStore";
import { useParams } from "react-router-dom";
import {
  fetchCarBodyTypes,
  getByIdCarBodyType,
  updateCarBodyType,
} from "../../store/slices/carBodyTypeSlice";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import FormikInput from "../../components/FormikInput/FormikInput";
import FormikSelect from "../../components/FormikSelect/FormikSelect";
import { GetByIdCarBodyType } from "../../models/Responses/CarBodyType/GetByIdCarBodyType";
import { useAppDispatch } from "../../store/useAppDispatch";
import { useAppSelector } from "../../store/useAppSelector";
import { Alert, Button, Col, Row } from "antd";
import Title from "antd/es/typography/Title";
type Props = {};

const UpdateCarBodyType = (props: Props) => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const carBodyTypeId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [carBodyType, setCarBodyType] = useState<GetByIdCarBodyType>();
  const carBodyTypeState = useAppSelector((state: any) => state.carBodyType);
  const [selectedValue, setSelectedValue] = useState({});
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.carBodyType.error);
  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(
        getByIdCarBodyType({ id: carBodyTypeId })
      );
      setCarBodyType((newResponse as any)?.payload);
      console.log(newResponse);

      dispatch(fetchCarBodyTypes());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const validationSchema = Yup.object().shape({
    id: Yup.number().required("Marka seçiniz"),
    name: Yup.string()
      .min(2, "Kasa Tipi en az 2 karakter olmalıdır")
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, "Kasa Tipi sadece harflerden oluşmalıdır")
      .required("Kasa Tipi Giriniz"),
  });
  const initialValues = {
    id: carBodyType?.id,
    name: carBodyType?.name,
  };

  const handleUpdateCarModel = async (values: any) => {
    try {
      const response = await dispatch(updateCarBodyType(values));
      // İşlem başarılı olduğunda
      setSuccessMessage("İşlem başarıyla tamamlandı");
      window.location.href = "/adminPanel/CarBodyTypes";
    } catch (error) {
      console.error("Error updating shift type: ", error);
      // Hata durumunda
      setErrorMessage("İşlem sırasında bir hata oluştu");
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setSelectedValue(values);
        handleUpdateCarModel(values);
      }}
      enableReinitialize={true}
    >
      <SideBar>
      <div
        className="container-card"
        style={{ marginTop: "150px", color: "white" }}
      >
        <Title style={{ marginLeft: "35%" }}>Kasa Tipi Güncelleme</Title>
            <Form>
              <Row gutter={[16, 16]} style={{ justifyContent: "space-around" }}>
                <Col md={8}>
                    
                    <Col span={32} style={{marginTop:'15px'}}>
                      <FormikInput
                        name="name"
                        label="Kasa Tipi Giriniz"
                        placeHolder="Kasa Tipi Giriniz."
                        type="text"
                      />
                    </Col>
                    <Col span={16} style={{marginTop:'15px', marginLeft: "100px"}}>
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
                    <Col span={16} style={{marginTop:'15px', marginLeft: "100px"}}>
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
          </div>
      </SideBar>
    </Formik>
  );
};

export default UpdateCarBodyType;
