import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useAppDispatch } from "../../store/useAppDispatch";
import { useParams } from "react-router";
import { VehicleStatusModel } from "../../models/Responses/VehicleStatus/VehicleStatusModel";
import {
  fetchVehicleStatus,
  getByIdVehicleStatus,
  updateVehicleStatus,
} from "../../store/slices/vehicleStatusSlice";
import FormikInput from "../../components/FormikInput/FormikInput";
import SideBar from "../../components/Sidebar/SideBar";
import { RootState } from "../../store/configureStore";
import { useAppSelector } from "../../store/useAppSelector";
import { Alert, Button, Col, Row } from "antd";
import Title from "antd/es/typography/Title";

const UpdateVehicleStatus = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const vehicleStatusId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [vehicleStatus, setVehicleStatus] = useState<VehicleStatusModel>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector(
    (state: RootState) => state.vehicleStatus.error
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
        getByIdVehicleStatus({ id: vehicleStatusId })
      );
      setVehicleStatus((newResponse as any)?.payload);

      dispatch(fetchVehicleStatus());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Araç durumu giriniz.")
      .min(2, "Araç durumu en az 2 karakter olmalıdır")
      .matches(
        /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
        "Araç durumu sadece harflerden oluşmalıdır"
      ),
  });

  const initialValues = {
    id: vehicleStatusId,
    name: vehicleStatus?.name,
  };

  const handleUpdateVehicleStatus = async (values: any) => {
    try {
      const response = await dispatch(updateVehicleStatus(values));
      setSuccessMessage("İşlem başarıyla tamamlandı");
      window.location.href = "/adminPanel/VehicleStatuses";
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
        <Title style={{ marginLeft: "35%" }}>Araç Durumu Güncelleme</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleUpdateVehicleStatus(values);
          }}
          enableReinitialize={true}
        >
          <Form>
            <Row gutter={[16, 16]} style={{ justifyContent: "space-around" }}>
              <Col md={8}>
                <Col span={32}>
                  <FormikInput
                    name="name"
                    label="Araç Durumu"
                    placeHolder="Araç Durumu Giriniz."
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

export default UpdateVehicleStatus;
