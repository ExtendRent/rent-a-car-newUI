import React, { useEffect, useState } from "react";

import "./CarCard.css";
import { getByAllFilteredCars } from "../../store/slices/carSlice";
import { RootState } from "../../store/configureStore";
import { getByBrandIdCarModels } from "../../store/slices/carModelSlice";
import { GetAllFilteredResponse } from "../../models/Responses/Car/GetAllFilteredResponse";

import { useAppSelector } from "../../store/useAppSelector";
import { useAppDispatch } from "../../store/useAppDispatch";
import useToken from "../../utils/useToken";
import {
  Alert,
  Button,
  Card,
  Col,
  DatePicker,
  Grid,
  Row,
  Select,
  Typography,
} from "antd";
import { fetchBrands } from "../../store/slices/brandSlice";
import { fetchColors } from "../../store/slices/colorSlice";
import { fetchFuelType } from "../../store/slices/fuelTypeSlice";
import { fetchShiftTypes } from "../../store/slices/shiftTypeSlice";
import moment from "moment";
import {
  mdiAccountGroup,
  mdiBagSuitcase,
  mdiCalendarAccountOutline,
  mdiCarChildSeat,
  mdiCarShiftPattern,
  mdiCreditCardMultipleOutline,
  mdiGasStationOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import {
  CarryOutOutlined,
  CreditCardOutlined,
  SafetyOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

interface CarCardProps {
  onButtonClick: (
    carEntityId: number,
    startDateFilter: string,
    endDateFilter: string
  ) => void;
  startDate: string; // formattedStartDate ve formattedEndDate'yi props olarak ekleyin
  endDate: string;
}
export default function CarCard({
  onButtonClick,
  startDate,
  endDate,
}: CarCardProps) {
  /*  const CarCart: React.FC<{ searchCarResponse: AllGetByDateCarResponse | undefined }> = ({ searchCarResponse }) => { */
  const carsState = useAppSelector((state: any) => state.car.cars);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [selectedCarModel, setSelectedCarModel] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedFuelType, setSelectedFuelType] = useState<number | null>(null);
  const [selectedShiftType, setSelectedShiftType] = useState<number | null>(
    null
  );

  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();

  const brandState = useAppSelector((state: any) => state.brand);
  const carModelState = useAppSelector((state: any) => state.carModel);
  const colorState = useAppSelector((state: any) => state.color);
  const fuelTypeState = useAppSelector((state: any) => state.fuelType);
  const shiftTypeState = useAppSelector((state: any) => state.shiftType);
  const [startDateFilter, setStartDate] = useState<string>(startDate);
  const [endDateFilter, setEndDate] = useState<string>(endDate);
  const [isLicenseTypeSuitableChecked, setIsLicenseTypeSuitableChecked] =
    useState(false);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.car.error);
  const { token, decodedToken, updateToken, clearToken } = useToken();

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchColors());
    dispatch(fetchFuelType());
    dispatch(fetchShiftTypes());
    /* decodedToken?.id */
  }, [dispatch]);

  const changeModel = (value: number) => {
    const carModelId = value;

    setSelectedCarModel(isNaN(carModelId) ? null : carModelId);
  };
  const changeBrand = (value: number) => {
    const brandId = value;
    setSelectedBrand(isNaN(brandId) ? null : brandId);
    if (isNaN(brandId)) {
      // Eğer brandId NaN ise, selectedCarModel'ı temizle
      setSelectedCarModel(null);
    } else {
      // NaN değilse, car modeli getir
      dispatch(getByBrandIdCarModels({ brandId }));
    }
  };
  const changeColor = (value: number) => {
    const colorId = value;
    setSelectedColor(isNaN(colorId) ? null : colorId);
  };
  const changeFuelType = (value: number) => {
    const fuelTypeId = value;
    setSelectedFuelType(isNaN(fuelTypeId) ? null : fuelTypeId);
  };
  const changeShiftType = (value: number) => {
    const shiftTypeId = value;
    setSelectedShiftType(isNaN(shiftTypeId) ? null : shiftTypeId);
  };
  const handleLicenseTypeSuitableChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsLicenseTypeSuitableChecked(e.target.checked);
  };

  const handleFiltred = () => {
    const filterData: GetAllFilteredResponse = {};

    if (selectedBrand !== null) {
      filterData.brandId = selectedBrand;
    }
    if (selectedCarModel !== null) {
      filterData.modelId = selectedCarModel;
    }
    if (selectedColor !== null) {
      filterData.colorId = selectedColor;
    }
    if (selectedFuelType !== null) {
      filterData.fuelTypeId = selectedFuelType;
    }
    if (selectedShiftType !== null) {
      filterData.shiftTypeId = selectedShiftType;
    }
    if (startDate !== null) {
      filterData.startDate = startDateFilter;
    }
    if (endDate !== null) {
      filterData.endDate = endDateFilter;
    }
    if (isLicenseTypeSuitableChecked == true) {
      filterData.customerId = decodedToken?.id;
      filterData.licenseSuitable = true;
    }
    if (isLicenseTypeSuitableChecked == false) {
      filterData.licenseSuitable = false;
    }

    try {
      dispatch(getByAllFilteredCars(filterData));
    } catch (error) {
      console.error("Redux action dispatch hatası:", error);
      setErrorMessage("İşlem başarısız. Lütfen tekrar deneyin.");
    }
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const [key, setKey] = useState(0);
  const { Title, Text } = Typography;
  return (
    <Row gutter={[8, 8]}>
      <Col md={6}>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="startDate" style={{ color: "white" }}>
              Başlama Tarihi
            </label>
            <DatePicker
              format="DD-MM-YYYY"
              placeholder="Başlama Tarihi"
              style={{
                width: "430px",
                height: "40px",
                marginBottom: "20px",
              }}
              onChange={(date) => {
                setStartDate(date ? date.format("YYYY-MM-DD") : "");
              }}
              disabledDate={(current) => current && current < moment()}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="endDate" style={{ color: "white" }}>
              Dönüş Tarihi
            </label>
            <DatePicker
              format="DD-MM-YYYY"
              placeholder="Başlama Tarihi"
              style={{
                width: "430px",
                height: "40px",
                marginBottom: "20px",
              }}
              onChange={(date) => {
                setEndDate(date ? date.format("YYYY-MM-DD") : "");
              }}
              disabledDate={(current) => current && current < moment()}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="brandSelect" style={{ color: "white" }}>
              Marka Seçiniz
            </label>
            <Select
              id="brandSelect"
              value={selectedBrand !== null ? selectedBrand.toString() : ""}
              onChange={(value: string) => changeBrand(parseInt(value))}
              style={{
                width: "430px",
                height: "40px",
                marginBottom: "20px",
              }}
            >
              <option value="">Marka seçiniz</option>
              {brandState.brands.map((brand: any) => (
                <option key={brand.id} value={brand.id.toString()}>
                  {brand.name}
                </option>
              ))}
            </Select>
          </div>

          {selectedBrand !== null && carModelState.carModel.length > 0 && (
            <div className="mb-3">
              <label htmlFor="carModelSelect" style={{ color: "white" }}>
                Araba Modeli Seçiniz
              </label>
              <Select
                id="carModelSelect"
                value={
                  selectedCarModel !== null ? selectedCarModel.toString() : ""
                }
                onChange={(value: string) => changeModel(parseInt(value))}
                style={{
                  width: "430px",
                  height: "40px",
                  marginBottom: "20px",
                }}
              >
                <option value="">Model seçiniz</option>
                {carModelState.carModel.map((carModel: any) => (
                  <option key={carModel.id} value={carModel.id.toString()}>
                    {carModel.name}
                  </option>
                ))}
              </Select>
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="colorSelect" style={{ color: "white" }}>
              Renk Seçiniz
            </label>
            <Select
              id="colorSelect"
              value={selectedColor !== null ? selectedColor.toString() : ""}
              onChange={(value: string) => changeColor(parseInt(value))}
              style={{
                width: "430px",
                height: "40px",
                marginBottom: "20px",
              }}
            >
              <option value="">Renk seçiniz</option>
              {colorState.colors.map((color: any) => (
                <option key={color.id} value={color.id.toString()}>
                  {color.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="mb-3">
            <label htmlFor="fuelTypeSelect" style={{ color: "white" }}>
              Yakıt Tipi Seçiniz
            </label>
            <Select
              id="fuelTypeSelect"
              value={
                selectedFuelType !== null ? selectedFuelType.toString() : ""
              }
              onChange={(value: string) => changeFuelType(parseInt(value))}
              style={{
                width: "430px",
                height: "40px",
                marginBottom: "20px",
              }}
            >
              <option value="">Yakıt Tipi Seçiniz</option>
              {fuelTypeState.fuelTypes.map((fuelType: any) => (
                <option key={fuelType.id} value={fuelType.id.toString()}>
                  {fuelType.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="mb-3">
            <label htmlFor="shiftTypeSelect" style={{ color: "white" }}>
              Vites Tipi Seçiniz
            </label>
            <Select
              id="shiftTypeSelect"
              value={
                selectedShiftType !== null ? selectedShiftType.toString() : ""
              }
              onChange={(value: string) => changeShiftType(parseInt(value))}
              style={{
                width: "430px",
                height: "40px",
                marginBottom: "20px",
              }}
            >
              <option value="">Vites Tipi Seçiniz</option>
              {shiftTypeState.shiftTypes.map((shiftType: any) => (
                <option key={shiftType.id} value={shiftType.id.toString()}>
                  {shiftType.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="mb-3">
            <label
              htmlFor="licenseTypeSuitableCheckbox"
              style={{ color: "white" }}
            >
              Ehliyetime uygun olanları göster
            </label>
            <input
              type="checkbox"
              style={{
                marginBottom: "20px",
              }}
              id="licenseTypeSuitableCheckbox"
              checked={isLicenseTypeSuitableChecked}
              onChange={handleLicenseTypeSuitableChange}
            />
          </div>
          <Button
            type="primary"
            style={{
              width: "150px",
              float: "right",
            }}
            onClick={handleFiltred}
          >
            Filtrele
          </Button>
        </div>
      </Col>
      {errorCustom && <Alert type="error" message={errorCustom} />}
      {!errorCustom && successMessage && (
        <Alert type="success" message={successMessage} />
      )}
      {successMessage && <Alert type="success" message={successMessage} />}

      <Col md={18} style={{ display: "flex" }}>
        {carsState.map((car: any) => (
          <Col span={8}>
            <Card
              key={car.id}
              hoverable
              style={{ marginTop: 2, minHeight: "100%" }}
              cover={
                <div>
                  <div className="car-info">
                    <div className="car-details">
                      <span>
                        {car.carModelEntityBrandEntityName}{" "}
                        {car.carModelEntityName}
                      </span>
                      <span className="car-price">{car.rentalPrice} TL</span>
                    </div>
                    <span className="car-segment">
                      {car.carSegmentEntityName}
                    </span>
                  </div>

                  <img
                    alt="example"
                    src={car.imageEntityImageUrl}
                    style={{
                      maxHeight: "100%",
                      objectFit: "cover",
                      paddingTop: "15%",
                      width: "100%",
                    }}
                  />
                </div>
              }
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Title level={4} style={{ color: "white" }}>
                    Araç Özellikleri
                  </Title>
                  <div className="mid-column">
                    <Icon
                      path={mdiAccountGroup}
                      size={1}
                      className="iconClass"
                    />
                    <Text style={{ color: "#c1c0c0" }}>{car.seat} Kişi</Text>
                  </div>
                  <div className="mid-column">
                    <Icon
                      path={mdiBagSuitcase}
                      size={1}
                      className="iconClass"
                    />
                    <Text style={{ color: "#c1c0c0" }}>
                      {car.luggage} Büyük Bavul
                    </Text>
                  </div>
                  <div className="mid-column">
                    <Icon
                      path={mdiGasStationOutline}
                      size={1}
                      className="iconClass"
                    />
                    <Text style={{ color: "#c1c0c0" }}>
                      {car.fuelTypeEntityName}
                    </Text>
                  </div>
                  <div className="mid-column">
                    <Icon
                      path={mdiCarShiftPattern}
                      size={1}
                      className="iconClass"
                    />
                    <Text style={{ color: "#c1c0c0" }}>
                      {car.shiftTypeEntityName}
                    </Text>
                  </div>
                </Col>
                <Col span={12}>
                  <Title level={4} style={{ color: "white" }}>
                    Kiralama Koşulları
                  </Title>
                  <div className="mid-column">
                    <Icon
                      path={mdiCalendarAccountOutline}
                      size={1}
                      className="iconClass"
                    />
                    <Text style={{ color: "#c1c0c0" }}>21 Yaş Ve Üstü</Text>
                  </div>
                  <div className="mid-column">
                    <Icon
                      path={mdiCarChildSeat}
                      size={1}
                      className="iconClass"
                    />
                    <Text style={{ color: "#c1c0c0" }}>
                      Ehliyet Yaşı 1 ve Üzeri
                    </Text>
                  </div>
                  <div className="mid-column">
                    <Icon
                      path={mdiCreditCardMultipleOutline}
                      size={1}
                      className="iconClass"
                    />
                    <Text style={{ color: "#c1c0c0" }}>1 Kredi Kartı</Text>
                  </div>
                </Col>
              </Row>
              <Button
                type="primary"
                style={{
                  width: "100%",
                  marginTop: "20px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                }}
                onClick={() =>
                  onButtonClick(car.id, startDateFilter, endDateFilter)
                }
              >
                Hemen Kirala
              </Button>
            </Card>
          </Col>
        ))}
      </Col>
    </Row>
  );
}
