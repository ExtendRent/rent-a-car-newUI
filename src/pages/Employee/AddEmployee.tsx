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
import { addEmployee } from "../../store/slices/employeeSlice";

type Props = {};

const AddEmployee = (props: Props) => {
    const dispatch = useAppDispatch();
    const [file, setFile] = useState<File | undefined>();
    const [selectedValue, setSelectedValue] = useState({});
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [imageError, setImageError] = useState("");
    const errorCustom = useAppSelector(
        (state: RootState) => state.imageLoad.error
    );


    const handleAddEmployee = async (values: any) => {
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
                const userImageEntityId = imageResponse.payload;
                const updatedValues = { ...values, userImageEntityId };
                const response = await dispatch(addEmployee(updatedValues));
                setSuccessMessage("İşlem başarıyla tamamlandı");
            }
        } catch (error) {
            console.error("Error : ", error);
            // Hata durumunda
            setErrorMessage("İşlem sırasında bir hata oluştu");
        }
        window.location.href = "/adminPanel/employees";
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .matches(
                /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
                "İsim sadece harflerden oluşmalıdır"
            )
            .required("İsim giriniz"),
        surname: Yup.string()
            .matches(
                /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
                "Soyisim sadece harflerden oluşmalıdır"
            )
            .required("Soyisim giriniz"),
        emailAddress: Yup.string().required("Mail Adresi Giriniz"),
        password: Yup.string()
            .required("Şifre Giriniz")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Şifre en az 8 karakter uzunluğunda olmalı, en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir"
            ),
        phoneNumber: Yup.string()
            .matches(/^[0-9]+$/, "Telefon numarası sadece sayılardan oluşmalıdır")
            .min(10, "Telefon numarası 10 hane olmalıdır")
            .max(10, "Telefon numarası 10 hane olmalıdır")
            .required("Telefon numarası giriniz"),
        salary: Yup.number()
            .min(0, "Maaş en az 0 olmalıdır")
            .required("Maaş giriniz"),
    });
    const initialValues = {
        name: "",
        surname: "",
        emailAddress: "",
        password: "",
        phoneNumber: "",
        salary: 0
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

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                setSelectedValue(values);

                handleAddEmployee(values);
            }}
            enableReinitialize={true}
        >
            <SideBar>
                <div
                    className="container-card"
                    style={{ marginTop: "150px", color: "white" }}
                >
                    <div>
                        <Title style={{ marginLeft: "35%" }}>Çalışan Ekleme</Title>
                        <Form>
                            <Row gutter={[16, 16]} style={{ justifyContent: "space-around" }}>
                                <Col md={8}>
                                    <div style={{ marginBottom: "20px" }}>

                                        <FormikInput
                                            name="name"
                                            label="İsim"
                                            placeHolder="İsim Giriniz."
                                            type='text'
                                        />


                                        <FormikInput
                                            name="surname"
                                            label="Soyisim"
                                            placeHolder="İsim Giriniz."
                                            type='text'
                                        />


                                        <FormikInput
                                            name="emailAddress"
                                            label="Mail Adresi"
                                            placeHolder="Mail Adresi Giriniz."
                                            type='text'
                                        />


                                        <FormikInput
                                            name="password"
                                            label="Şifre Giriniz"
                                            placeHolder="Şifre Giriniz."
                                            type='text'
                                        />


                                        <FormikInput
                                            name="phoneNumber"
                                            label="Telefon Numarası"
                                            placeHolder="Telefon Numarası Giriniz."
                                            type='text'
                                        />


                                        <FormikInput
                                            name="salary"
                                            label="Maaş "
                                            placeHolder="Maaş Giriniz."
                                            type='number'
                                        />



                                        <input type="file" name="image" onChange={handleOnChange} />
                                        {imageError && (
                                            <Alert type="error" message={imageError} showIcon />
                                        )}




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


                                        <div
                                            style={{
                                                width: "236px",
                                                marginTop: "20px",
                                                marginLeft: "36px",
                                            }}
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
                                </Col>
                            </Row>

                        </Form>
                    </div>
                </div>
            </SideBar >
        </Formik >
    );
};

export default AddEmployee;
