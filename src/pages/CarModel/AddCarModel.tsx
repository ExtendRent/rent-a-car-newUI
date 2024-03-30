import React, { useEffect, useState } from 'react'
import { RootState } from '../../store/configureStore';
import { addCarModel } from '../../store/slices/carModelSlice';
import { fetchBrands } from '../../store/slices/brandSlice';
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import FormikSelect from '../../components/FormikSelect/FormikSelect';
import { useAppSelector } from '../../store/useAppSelector';
import { useAppDispatch } from '../../store/useAppDispatch';
import { Alert, Button, Col, Row } from 'antd';
import Title from 'antd/es/typography/Title';

type Props = {}

const AddCarModel = (props: Props) => {

  const dispatch = useAppDispatch();
  const [selectedValue, setSelectedValue] = useState({});
  const brandState =useAppSelector((state: any) => state.brand);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.carModel.error);
  
  useEffect(()=>{
    dispatch(fetchBrands())
  },[dispatch])

  const handleAddCarModel =async (values: any) => {
  
      try {
        const response = await dispatch(addCarModel(values));
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
    carModelEntityName: Yup.string()
      .min(2, "Model en az 2 karakter olmalıdır")
      .required("Model Giriniz"),
    brandEntityId: Yup.number().required('Marka seçiniz'),
  });
  const initialValues = {
    brandEntityId: "",
    carModelEntityName:"",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setSelectedValue(values);
        handleAddCarModel(values);
      }}
      enableReinitialize={true}
    >
    <SideBar>
        <div className="container-card" style={{ marginTop: "150px", color: "white" }}>

          <Title style={{marginLeft: "35%"}}>Model Ekleme</Title>
          <Form>
          <Row gutter={[16, 16]} style={{justifyContent: "space-around"}}>
          <Col md={8}>
                <div style={{marginBottom:"20px"}}>
                    <FormikSelect
                      label="Marka "
                      name="brandEntityId"
                      options={brandState.brands.map((brands: any) => ({ value: brands.id, label: brands.name }))}
                    />
                </div>
               
                <div>
                  <FormikInput
                    name="carModelEntityName"
                    label="Model "
                    placeHolder="Model Giriniz."
                    type="text"
                  />
                </div>
                <Button style={{marginTop:'30px', backgroundColor: "rgb(140,24,24)", color:"white", width:"200px" , borderRadius:"10px", marginLeft:"140px" }} htmlType='submit'>Ekle</Button>
           
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
      </SideBar>
    </Formik>
  )
}

export default AddCarModel