import React, { useState } from "react";
import { RootState } from "../../store/configureStore";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import { useAppSelector } from "../../store/useAppSelector";
import { useAppDispatch } from "../../store/useAppDispatch";
import Title from "antd/es/typography/Title";
import { Alert, Button, Col, Row } from "antd";
import { addDrivingLicenseType } from "../../store/slices/drivingLicenseTypeSlice";
type Props = {};

const AddDrivingLicenseType = (props: Props) => {
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const errorCustom = useAppSelector(
        (state: RootState) => state.drivingLicenseType.error
    );

    const handleAddDrivingLicenseType = async (values: any) => {
        try {
            const response = await dispatch(addDrivingLicenseType(values));
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
            .matches(/^[A-Z]{1,3}$/, "Geçersiz ehliyet tipi")
            .required("Ehliyet tipi gerekli"),
        description: Yup.string()
            .max(30, "En fazla 30 karakter girebilirsiniz")
            .required("Açıklama gerekli"),
        licenseLevel: Yup.number()
            .min(0, "Lisans seviyesi en az 0 olmalıdır")
            .required("Lisans seviyesi gerekli"),

    });
    const initialValues = {
        name: "",
        description: "",
        licenseLevel: 0,
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                handleAddDrivingLicenseType(values);
            }}
            enableReinitialize={true}
        >
            <SideBar>
                <div
                    className="container-card"
                    style={{ marginTop: "150px", color: "white" }}
                >
                    <div className="form">
                        <Title style={{ marginLeft: "35%" }}>Ehliyet Tipi Ekleme</Title>
                        <Form>
                            <Row gutter={[16, 16]} style={{ justifyContent: "space-around" }}>
                                <Col md={8}>
                                    <div style={{ marginBottom: "20px" }}>
                                        <FormikInput
                                            name="name"
                                            label="Ehliyet Tipi "
                                            placeHolder="Ehliyet Tipi Giriniz."
                                            type="text"
                                        />
                                        <FormikInput
                                            name="description"
                                            label="Açıklama "
                                            placeHolder="Açıklama Giriniz."
                                            type="text"
                                        />
                                        <FormikInput
                                            name="licenseLevel"
                                            label="License Level "
                                            placeHolder="Lisans Seviyesi Giriniz."
                                            type="number"
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

export default AddDrivingLicenseType;
