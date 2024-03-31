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
import { addBrand } from "../../store/slices/brandSlice";
import { addBrandImages } from "../../store/slices/imageSlice";
type Props = {};

const AddBrand = (props: Props) => {
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [imageValue, setImageValue] = useState({});
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [imageError, setImageError] = useState("");
    const errorCustom = useAppSelector(
        (state: RootState) => state.imageLoad.error
    );
    const [file, setFile] = useState<File | undefined>();

    const handleAddBrand = async (values: any) => {
        if (typeof file === "undefined") {
            setImageError("Lütfen bir resim seçiniz");
            return;
        }

        const formData = new FormData();
        try {
            formData.append("image", file);
            const thunkParams = {
                image: formData,
                brandName: values.brandName,
            };
            const imageResponse = await dispatch(addBrandImages(thunkParams));
            if (imageResponse) {
                const brandImageEntityId = imageResponse.payload;
                const updatedValues = { ...values, brandImageEntityId };
                const response = await dispatch(addBrand(updatedValues));
                setSuccessMessage("İşlem başarıyla tamamlandı");
            }
        } catch (error) {
            console.error("Error : ", error);
            // Hata durumunda
            setErrorMessage("İşlem sırasında bir hata oluştu");
        }
        /* window.location.href = "/adminPanel/cars"; */
    };

    const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement & { files: FileList };

        const files = target.files;

        if (files) {
            setFile(target.files[0]);
            setImageError("");
        } else {
            // Eğer resim seçilmediyse hata mesajını ayarla
            setImageError("Lütfen bir resim seçiniz");
        }
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, "Marka en az 2 karakter olmalıdır")
            .matches(
                /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
                "Marka sadece harflerden oluşmalıdır"
            )
            .required("Marka Giriniz"),
    });
    const initialValues = {
        name: "",
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                handleAddBrand(values);
            }}
            enableReinitialize={true}
        >
            <SideBar>
                <div
                    className="container-card"
                    style={{ marginTop: "150px", color: "white" }}
                >
                    <div className="form">
                        <Title style={{ marginLeft: "35%" }}>Marka Ekleme</Title>
                        <Form>
                            <Row gutter={[16, 16]} style={{ justifyContent: "space-around" }}>
                                <Col md={8}>
                                    <div style={{ marginBottom: "20px" }}>
                                        <FormikInput
                                            name="name"
                                            label="Marka "
                                            placeHolder="Marka Giriniz."
                                            type="text"
                                        />
                                        <Col span={16} style={{marginTop:'15px'}}>
                                            <input
                                                type="file"
                                                name="image"
                                                onChange={handleOnChange}
                                            />
                                            {imageError && (
                                                <Alert type="error" message={imageError} showIcon />
                                            )}
                                        </Col>
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
                            {errorCustom && (
                                <Alert
                                    type="warning"
                                    message={errorCustom}
                                    showIcon
                                />
                            )}
                            {errorMessage && (
                                <Alert type="error" message={errorMessage} showIcon />
                            )}
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

export default AddBrand;
