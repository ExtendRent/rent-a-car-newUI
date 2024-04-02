import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BrandModel } from "../../models/Responses/Brand/BrandModel";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/configureStore";
import {
  fetchBrands,
  getByIdBrand,
  updateBrand,
} from "../../store/slices/brandSlice";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import FormikInput from "../../components/FormikInput/FormikInput";
import { addBrandImages } from "../../store/slices/imageSlice";
import { useAppDispatch } from "../../store/useAppDispatch";
import { useAppSelector } from "../../store/useAppSelector";
import { Alert, Button, Col, Row } from "antd";
import Title from "antd/es/typography/Title";

const UpdateBrand = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const brandId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [brand, setBrand] = useState<BrandModel>();
  const [file, setFile] = useState<File | undefined>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.brand.error);
  const [imageError, setImageError] = useState("");
  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(getByIdBrand({ id: brandId }));
      setBrand((newResponse as any)?.payload);

      dispatch(fetchBrands());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Marka Giriniz."),
  });
  const initialValues = {
    id: brandId,
    name: brand?.name,
    brandImageEntityId: brand?.brandImageEntityId,
  };

  const handleUpdateBrand = async (values: any) => {
    try {
      if (typeof file === "undefined") {
        const updatedValues = { ...values };
        const response = await dispatch(updateBrand(updatedValues));
        setSuccessMessage("İşlem başarıyla tamamlandı");
      } else {
        const formData = new FormData();

        formData.append("image", file);
        const thunkParams = {
          image: formData,
          brandName: values.name,
        };
        const imageResponse = await dispatch(addBrandImages(thunkParams));
        if (imageResponse) {
          const brandImageEntityId = imageResponse.payload;
          const updatedValues = { ...values, brandImageEntityId };
          const response = await dispatch(updateBrand(updatedValues));
          setSuccessMessage("İşlem başarıyla tamamlandı");
        }
      }
      //window.location.href = "/adminPanel/brands";
    } catch (error) {
      console.error("Error : ", error);
      setErrorMessage("İşlem sırasında bir hata oluştu");
    }
  };
  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & { files: FileList };

    const files = target.files;

    if (files) {
      setFile(target.files[0]);
      setImageError("");
    }
  };
  return (
    <SideBar>
      <div
        className="container-card"
        style={{ marginTop: "150px", color: "white" }}
      >
        <Title style={{ marginLeft: "35%" }}>Marka Güncelleme</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleUpdateBrand(values);
          }}
          enableReinitialize={true}
        >
          <Form>
            <Row gutter={[16, 16]} style={{ justifyContent: "space-around" }}>
              <Col md={8}>
              
                  <Col span={32}>
                    <FormikInput
                      name="name"
                      label="Marka"
                      placeHolder="Marka Giriniz."
                      type="text"
                    />
                  </Col>
                  <Col span={16} style={{marginTop:'15px'}}>
                    <input type="file" name="image" onChange={handleOnChange} />
                    <img src={brand?.brandImageEntityUrl} alt="Brand Logo" width={120} height={80}/>
                    {imageError && <Alert type="error" message={imageError} />}
                  </Col>
                  <Col span={16} style={{marginTop:'15px', marginLeft: "100px",}}>
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
                
          
              <Col span={24}>
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

export default UpdateBrand;
