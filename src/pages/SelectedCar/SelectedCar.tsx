import React, { useEffect, useState } from "react";
import "./SelectedCar.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/configureStore";
import { addShowRental } from "../../store/slices/showRentalSlice";
import { useLocation } from "react-router";
import ShowRental from "../../components/ShowRental/ShowRental";
import moment from "moment";
import useToken from "../../utils/useToken";
import { AddShowRentalResponse } from "../../models/Responses/Rental/AddShowRentalResponse";
import CarCart from "../../components/CarCard/CarCard";
import { AllGetByDateCarResponse } from "../../models/Responses/Car/AllGetByDateCarResponse";
import Payment from "../../components/Payment/Payment";
import RentalDetail from "../../components/RentalDetail/RentalDetail";
import { useAppSelector } from "../../store/useAppSelector";
import { Tabs } from "antd";
import CarCard from "../../components/CarCard/CarCard";
import TabPane from "antd/es/tabs/TabPane";

const SelectedCar: React.FC<{
  response: AllGetByDateCarResponse | undefined;
}> = ({ response }) => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.car.error);

  const startDateString = location?.state?.startDate || "";
  const endDateString = location?.state?.endDate || "";

  const { token, decodedToken, updateToken, clearToken } = useToken();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [rentalResponse, setRentalResponse] = useState<
    AddShowRentalResponse | undefined
  >();
  const [lastAmount, setLastAmount] = useState<number>(0);
  const startDate = moment(startDateString).format("YYYY-MM-DD");
  const endDate = moment(endDateString).format("YYYY-MM-DD");

  const handleCarButtonClick = async (
    discountCode: string,
    carEntityId: number,
    startDate: Date | string,
    endDate: Date | string,
    customerEntityId?: number
  ) => {
    const startDateValue =
      startDate instanceof Date
        ? startDate.toISOString().split("T")[0]
        : startDate;
    const endDateValue =
      endDate instanceof Date ? endDate.toISOString().split("T")[0] : endDate;

    setActiveTab("tab2");
    if (
      customerEntityId !== undefined &&
      typeof customerEntityId === "number"
    ) {
      try {
        const response = await dispatch(
          addShowRental({
            discountCode,
            carEntityId,
            startDate: startDateValue,
            endDate: endDateValue,
            customerEntityId,
          })
        );

        if (response.payload) {
          setRentalResponse(response.payload as AddShowRentalResponse);
        } else {
          console.error(
            "Error adding show rental: Response payload is undefined"
          );
        }
      } catch (error) {
        console.error("Error adding show rental:", error);
      }
    }
  };

  const handleRentDetailsButtonClick = () => {
    setActiveTab("tab3");
  };

  const handlePaymentProcessButtonClick = () => {
    setActiveTab("tab4");
  };

  useEffect(() => {
    setActiveTab("tab1");
  }, []);
  return (
   
    <Tabs
      activeKey={activeTab || undefined}
      style={{marginTop:"70px",fontSize:"20px"}}
      onChange={(key) => setActiveTab(key as string)}
    >
      
      <TabPane
        key="tab1"
      
        
        tab={
          <div
            className={
              activeTab === "tab1" ? "tab-title active-tab" : "tab-title"
            }
          >
            Aracınız
          </div>
        }
      >
        
        <CarCard
          onButtonClick={(carEntityId) => {
            const formattedStartDate = new Date(`${startDate}T00:00:00.000Z`)
              .toISOString()
              .split("T")[0];
            const formattedEndDate = new Date(`${endDate}T00:00:00.000Z`)
              .toISOString()
              .split("T")[0];

            handleCarButtonClick(
              "",
              carEntityId,
              formattedStartDate,
              formattedEndDate,
              decodedToken?.id
            );
          }}
          startDate={startDate}
          endDate={endDate}
        />
      </TabPane>
      
      <TabPane
        key="tab2"
        tab={
          <div
            className={
              activeTab === "tab2" ? "tab-title active-tab" : "tab-title "
            }
          >
            Kiralama Detayları
          </div>
        }
        disabled={activeTab !== "tab2" && activeTab !== "tab3" && activeTab !== "tab4"}
      >
        <div className="tab-content">
          <ShowRental
            key={JSON.stringify(rentalResponse)}
            response={rentalResponse}
            onPaymentProcessClick={handleRentDetailsButtonClick}
          />
        </div>
      </TabPane>
      <TabPane
        key="tab3"
        tab={
          <div
            className={
              activeTab === "tab3" ? "tab-title active-tab" : "tab-title "
            }
          >
            Ödeme İşlemi
          </div>
        }
        disabled={activeTab !== "tab3" && activeTab !== "tab4"}
      >
        <div className="tab-content">
          <Payment
            response={rentalResponse}
            onPaymentProcessClick={handlePaymentProcessButtonClick}
            startDate={startDate}
            endDate={endDate}
            setLastAmount={setLastAmount}
          />
        </div>
      </TabPane>
      <TabPane
        key="tab4"
        tab={
          <div
            className={
              activeTab === "tab4" ? "tab-title active-tab" : "tab-title"
            }
          >
            Ödeme Bilgileri
          </div>
        }
        disabled={activeTab !== "tab4"}
      >
        <RentalDetail
            key={JSON.stringify(rentalResponse)}
            response={rentalResponse}
            onPaymentProcessClick={handleRentDetailsButtonClick}
            lastAmount={lastAmount}
          />
      </TabPane>
    </Tabs>
  );
};

export default SelectedCar;
