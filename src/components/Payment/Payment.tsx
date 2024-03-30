import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { AddShowRentalResponse } from "../../models/Responses/Rental/AddShowRentalResponse";
import { useDispatch, useSelector } from "react-redux";
import CreditCardForm from "../CreditCardForm/CreditCardForm";
import { AppDispatch } from "../../store/configureStore";
import { addRental } from "../../store/slices/showRentalSlice";
import { fetchPaymentTypes } from "../../store/slices/paymentTypeSlice";
import './Payment.css';
import { Button, Form, Select } from "antd";
import Title from "antd/es/typography/Title";
interface CreditCardInfo {
  cardNumber: string;
  cardOwnerName: string;
  cardOwnerSurname: string;
  expirationDate: Date; // Tarih nesnesi olarak ayarlayın
  cvc: string;
}

const Payment: React.FC<{
  startDate: Date | string;
  endDate: Date | string;
  response: AddShowRentalResponse | undefined;
  onPaymentProcessClick: () => void;
  setLastAmount: Dispatch<SetStateAction<number>>;
}> = ({
  startDate,
  endDate,
  response,
  onPaymentProcessClick,
  setLastAmount,
}) => {
  const [lastAmount, setLastAmountLocal] = useState<number>(0);
  const carsState = useSelector((state: any) => state.showRental.showRental);
  const dispatch = useDispatch<AppDispatch>();
  const paymentTypeState = useSelector((state: any) => state.paymentType);
  const [paymentResponse, setPaymentResponse] = useState<number | undefined>();
  const [selectedPaymentType, setSelectedPaymentType] = useState<number>(0);
  const [creditCardInfo, setCreditCardInfo] = useState<CreditCardInfo>({
    cardNumber: "",
    cardOwnerName: "",
    cardOwnerSurname: "",
    expirationDate: new Date(), // Başlangıçta geçerli tarihle başlatın
    cvc: "",
  });

  useEffect(() => {
    dispatch(fetchPaymentTypes());
    setLastAmountLocal(carsState[carsState.length - 1]?.response?.amount || 0);
  }, [carsState]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleCreditCardChange = (creditCardInfo: CreditCardInfo) => {
    setCreditCardInfo(creditCardInfo);
  };

  const handleCalculateClick = async () => {
    const formattedStartDate =
      typeof startDate === "string"
        ? startDate
        : startDate.toISOString().split("T")[0];
    const formattedEndDate =
      typeof endDate === "string"
        ? endDate
        : endDate.toISOString().split("T")[0];
    const customerEntityId = response?.response.customerResponse.id;
    const carEntityId = response?.response.carResponse.id;

    if (customerEntityId !== undefined && carEntityId !== undefined) {
      const addRentalRequest = await dispatch(
        addRental({
          customerEntityId,
          carEntityId,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          paymentTypeId: selectedPaymentType,
          amount: lastAmount,
          discountCode: response?.response.discountCode,
          creditCardInformation: creditCardInfo,
        })
      );

      setPaymentResponse(lastAmount);
      setLastAmountLocal(lastAmount);

      onPaymentProcessClick();
    } else {
      console.error("Invalid customer or car ID.");
    }
  };

  const handleConfirmButtonClick = () => {
    handleCalculateClick();
    onPaymentProcessClick();
    setLastAmount(lastAmount);
  };
  const handleSelectChange = (value:number) => {
    const paymentTypeId = value;
    setSelectedPaymentType(paymentTypeId);
  };
  

  return (
    <div className="form">
      <div className="credit-cart-form">
      <Form onFinish={handleSubmit}>
        <div className="py-4">
          <Title>Fiyat: {lastAmount}</Title>
        </div>
        <label htmlFor="paymentTypeSelect" className="form-label">
          Ödeme Yöntemi
        </label>
        <Select
        
          value={selectedPaymentType !== null ? selectedPaymentType.toString() : ""}
          onChange={(value: string) => handleSelectChange(parseInt(value))}
          style={{
            width: "100%",
           height: "40px",
           marginBottom: "20px",
         }}
        >
          <option value="" disabled>
            Seçiniz
          </option>
          {paymentTypeState.paymentTypes.map((paymentType: any) => (
            <option key={paymentType.id} value={paymentType.id.toString()}>
              {paymentType.name}
            </option>
          ))}
        </Select>

        
        {selectedPaymentType === 1 && (
          <CreditCardForm onCreditCardChange={handleCreditCardChange} />
        )}

        <div className="d-grid" style={{ justifyItems: "end" }} >
        <Form.Item>
          <Button
             type="primary"
            onClick={handleConfirmButtonClick}
            disabled={selectedPaymentType !== 1}
            style={{float:"right",width:"20%"}}
          >
            Ödeme
          </Button>
          </Form.Item>
        </div>
        {selectedPaymentType !== 1 ? (
          <p className="text-danger" style={{color:"red"}}>
            Sadece kredi kartı ile ödeme yapılabilir.
          </p>
        ) : null}
        </Form>
      </div>
    </div>
  );
};

export default Payment;
