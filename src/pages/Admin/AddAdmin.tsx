import { Form, Formik } from "formik";
import React, { useState } from "react";
import SideBar from "../../components/Sidebar/SideBar";
import FormikInput from "../../components/FormikInput/FormikInput";
import * as Yup from "yup";
import { RootState } from "../../store/configureStore";
import { addUserImages } from "../../store/slices/imageSlice";
import { useAppSelector } from "../../store/useAppSelector";
import { useAppDispatch } from "../../store/useAppDispatch";
import { Alert, Button, Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import { addAdmin } from "../../store/slices/adminSlice";

type Props = {};

const AddAdmin = (props: Props) => {
    const dispatch = useAppDispatch();
    const [file, setFile] = useState<File | undefined>();
    const [selectedValue, setSelectedValue] = useState({});
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [imageError, setImageError] = useState("");
    const errorCustom = useAppSelector(
        (state: RootState) => state.imageLoad.error
    );


    const handleAddAdmin = async (values: any) => {
        if (typeof file === "undefined") {
            setImageError("Lütfen bir resim seçiniz");
            return;
        }

        const formData = new FormData();
        try {
            formData.append("image", file);
            const thunkParams = {
                image: formData,
                emailAddress: values.emailAddress,
            };
            const imageResponse = await dispatch(addUserImages(thunkParams));
            if (imageResponse) {
                const userImageEntityId = imageResponse.payload.response;
                const updatedValues = { ...values, userImageEntityId };
                const response = await dispatch(addAdmin(updatedValues));
                setSuccessMessage("İşlem başarıyla tamamlandı");
            }
        } catch (error) {
            console.error("Error : ", error);
            // Hata durumunda
            setErrorMessage("İşlem sırasında bir hata oluştu");
        }
        window.location.href = "/adminPanel/admins";
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'İsim sadece harflerden oluşmalıdır')
            .required('İsim giriniz'),
        surname: Yup.string()
            .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Soyisim sadece harflerden oluşmalıdır')
            .required('Soyisim giriniz'),
        emailAddress: Yup.string().required('Mail Adresi Giriniz'),
        password: Yup.string().required('Şifre Giriniz')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Şifre en az 8 karakter uzunluğunda olmalı, en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir'),
        phoneNumber: Yup.string()
            .matches(/^[0-9]+$/, 'Telefon numarası sadece sayılardan oluşmalıdır')
            .min(10, 'Telefon numarası 10 hane olmalıdır')
            .max(10, 'Telefon numarası 10 hane olmalıdır')
            .required('Telefon numarası giriniz'),
        salary: Yup.number()
            .min(0, 'Maaş en az 0 olmalıdır')
            .required('Maaş giriniz')
    })
    const initialValues = {
        name: '',
        surname: '',
        emailAddress: '',
        password: '',
        phoneNumber: '',
        salary: 0,
    }

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

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                setSelectedValue(values);

                handleAddAdmin(values);
            }}
            enableReinitialize={true}
        >
            <SideBar>
                <div
                    className="container-card"
                    style={{ marginTop: "150px", color: "white" }}
                >
                    <div>
                        <Title style={{ marginLeft: "35%" }}>Admin Ekleme</Title>
                        <Form>
                            <Row gutter={[16, 16]} style={{ justifyContent: "space-around" }}>
                                <Col md={8}>
                                    <Col span={32}>
                                        <FormikInput
                                            name="name"
                                            label="Ad"
                                            placeHolder="Ad Giriniz."
                                            type="text"
                                        />
                                    </Col>
                                    <Col span={32} style={{ marginTop: "15px" }}>
                                        <FormikInput
                                            name="surname"
                                            label="Soyad"
                                            placeHolder="Soyadı Giriniz"
                                            type="text"
                                        />
                                    </Col>
                                    <Col span={32} style={{ marginTop: "15px" }}>
                                        <FormikInput
                                            name="emailAddress"
                                            label="Email"
                                            placeHolder="Mail Adresi Giriniz"
                                            type="text"
                                        />
                                    </Col>
                                    <Col span={32} style={{ marginTop: "15px" }}>
                                        <FormikInput
                                            name="password"
                                            label="Şifre"
                                            placeHolder="Şifre Giriniz"
                                            type="text"
                                        />
                                    </Col>
                                    <Col span={32} style={{ marginTop: "15px" }}>
                                        <FormikInput
                                            name="phoneNumber"
                                            label="Telefon"
                                            placeHolder="Telefon Giriniz"
                                            type="text"
                                        />
                                    </Col>
                                    <Col span={32} style={{ marginTop: "15px" }}>
                                        <FormikInput
                                            name="salary"
                                            label="Maaş"
                                            placeHolder="Maaş Giriniz"
                                            type="number"
                                        />
                                    </Col>
                                    
                                    <input type="file" name="image" onChange={handleOnChange} style={{ marginTop: "15px" }} />
                                    {imageError && (
                                        <Alert type="error" message={imageError} showIcon />
                                    )}
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
                                            {" "}
                                            Ekle
                                        </Button>
                                    </Col>
                                    <Col
                                        span={32}
                                        style={{ marginTop: "15px", marginLeft: "100px" }}
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
                                    </Col>

                                </Col>
                            </Row>

                        </Form>
                    </div>
                </div>
            </SideBar >
        </Formik >
    );
};

export default AddAdmin;
