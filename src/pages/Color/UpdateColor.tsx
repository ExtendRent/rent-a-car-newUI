import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../store/useAppDispatch';
import { useParams } from 'react-router';
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SideBar from '../../components/Sidebar/SideBar';
import FormikInput from '../../components/FormikInput/FormikInput';
import { useAppSelector } from '../../store/useAppSelector';
import { RootState } from '../../store/configureStore';
import { ColorModel } from '../../models/Responses/Color/ColorModel';
import { fetchColors, getByIdColor, updateColor } from '../../store/slices/colorSlice';
import { Alert, Button, Col, Row } from 'antd';
import Title from 'antd/es/typography/Title';


const UpdateColor = () => {
  
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const colorId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [color, setColor] = useState<ColorModel>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.color.error);

  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(getByIdColor({ id: colorId }));
      setColor((newResponse as any)?.payload);

      dispatch(fetchColors());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Renk giriniz.")
      .min(2, 'Renk en az 2 karakter olmalıdır')
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Renk sadece harflerden oluşmalıdır')
  });

  const initialValues = {
    id: colorId,
    name: color?.name,
  };

  const handleUpdateColor = async (values: any) => {
    try {
      const response = await dispatch(updateColor(values));
      // İşlem başarılı olduğunda
      setSuccessMessage("İşlem başarıyla tamamlandı");
      window.location.href = "/adminPanel/Colors";
    } catch (error) {
      console.error("Error updating color: ", error);
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
        <Title style={{ marginLeft: "35%" }}>Renk Güncelleme</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleUpdateColor(values);
          }}
          enableReinitialize={true}
        >
          

            <Form>
              <Row gutter={[16, 16]} style={{ justifyContent: "space-around" }}>
                <Col md={8}>
                  <Col span={32}>
                    <FormikInput
                      name="name"
                      label="Renk"
                      placeHolder="Renk Giriniz."
                      type="text"
                    />
                  </Col>
                  <Col span={32}>
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
                  <Col span={32} style={{marginTop:'15px', marginLeft: "100px"}}>
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
  )
}

export default UpdateColor