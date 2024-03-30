import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import { Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

import "./CreditCardForm.css";
import { Col, Form, Input, Row, Select } from "antd";
import { Option } from "antd/es/mentions";

interface CreditCardChangeHandler {
  (creditCardInfo: any): void;
}

const CreditCardForm = ({
  onCreditCardChange,
}: {
  onCreditCardChange: CreditCardChangeHandler;
}) => {
  const [state, setState] = useState({
    cardNumber: "",
    cardOwnerName: "",
    cardOwnerSurname: "",
    expirationDate: "",
    cvc: "",
    focus: "",
  });

  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");

  const monthOptions = [
    { value: "01", label: "Ocak" },
    { value: "02", label: "Şubat" },
    { value: "03", label: "Mart" },
    { value: "04", label: "Nisan" },
    { value: "05", label: "Mayıs" },
    { value: "06", label: "Haziran" },
    { value: "07", label: "Temmuz" },
    { value: "08", label: "Ağustos" },
    { value: "09", label: "Eylül" },
    { value: "10", label: "Ekim" },
    { value: "11", label: "Kasım" },
    { value: "12", label: "Aralık" },
  ];

  // Yıl seçimi için dinamik bir seçenek listesi oluşturun
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  const yearOptions = years.map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const formattedValue = value.replace(/\D/g, "");
      const updatedValue = formattedValue.slice(0, 16);
      let formattedCardNumber = "";
      for (let i = 0; i < updatedValue.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formattedCardNumber += " ";
        }
        formattedCardNumber += updatedValue[i];
      }
      setState((prevState) => ({
        ...prevState,
        [name]: formattedCardNumber,
      }));
      onCreditCardChange({ ...state, [name]: formattedCardNumber });
    } else if (name === "cvc" && /^\d{0,3}$/.test(value)) {
      if (/^\d*$/.test(value)) {
        // Sadece rakam içeriyorsa
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        onCreditCardChange({ ...state, [name]: value });
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      onCreditCardChange({ ...state, [name]: value });
    }
  };

  const handleInputFocus = (
    e: React.FocusEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };

  const handleMonthChange = (value: string) => {
    const selectedMonth = value;
    setExpirationMonth(selectedMonth);
    const formattedExpirationDate = `${expirationYear}-${selectedMonth}-01`;
    setState((prevState) => ({
      ...prevState,
      expirationDate: formattedExpirationDate,
    }));
    onCreditCardChange({ ...state, expirationDate: formattedExpirationDate });
  };

  const handleYearChange = (value: string) => {
    const selectedYear = value;
    setExpirationYear(selectedYear);
    const formattedExpirationDate = `${selectedYear}-${expirationMonth}-01`;
    setState((prevState) => ({
      ...prevState,
      expirationDate: formattedExpirationDate,
    }));
    onCreditCardChange({ ...state, expirationDate: formattedExpirationDate });
  };

  return (
    <Form onFinish={() => {}}>
      <Cards
        name={`${state.cardOwnerName} ${state.cardOwnerSurname}`}
        number={state.cardNumber}
        expiry={state.expirationDate}
        cvc={state.cvc}
        focused={state.focus as Focused}
      />
      <div className="mt-3">
       
          <Row gutter={[16, 16]} justify="space-evenly" style={{marginBottom:"30px"}}>
            <Col xs={24} md={12}>
              <Form.Item
              rules={[
                { required: true, message: 'Kart numarası boş bırakılamaz!' },
                // Diğer doğrulama kuralları buraya eklenebilir
              ]}>
              <Input
                type="text"
                placeholder="Kart Numarası"
                name="cardNumber"
                value={state.cardNumber}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
                style={{ marginTop: "15px" }}
                
              />
              </Form.Item>
              <Form.Item>
              <Input
                type="text"
                placeholder="Adınız"
                name="cardOwnerName"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
                style={{ marginTop: "15px" }}
              />
              </Form.Item>
              <Form.Item>
              <Input
                type="text"
                placeholder="Soyadınız"
                name="cardOwnerSurname"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
                style={{ marginTop: "15px" }}
              />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Row gutter={[16, 16]}>
                <Col xs={12} md={26}>
                <Form.Item
                    name="select"
                    rules={[{ required: true, message: 'Please select your option!' }]}
                  >
                  <Select
                    value={
                      expirationMonth !== null ? expirationMonth.toString() : ""
                    }
                    onChange={(value) => handleMonthChange(value)}
                    onFocus={handleInputFocus}
                    placeholder="Ay"
                    style={{ marginTop: "15px", width: "100%" }}
                    
                  >
                    <Option value="">Ay</Option>
                    {monthOptions.map((option) => (
                      <Option
                        key={option.value}
                        value={option.value.toString()}
                      >
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                  </Form.Item>
                </Col>
                <Col xs={12} md={12}>
                <Form.Item
                    name="select"
                    rules={[{ required: true, message: 'Please select your option!' }]}
                  >
                  <Select
                    value={
                      expirationYear !== null ? expirationYear.toString() : ""
                    }
                    onChange={(value) => handleYearChange(value)}
                    onFocus={handleInputFocus}
                    placeholder="Yıl"
                    style={{ marginTop: "15px" , width: "100%"}}
                  >
                    <Option value="">Yıl</Option>
                    {yearOptions.map((option) => (
                      <Option
                        key={option.value}
                        value={option.value.toString()}
                      >
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
              <Input
                type="text"
                placeholder="CVC"
                name="cvc"
                maxLength={3}
                onKeyPress={(e) => {
                  const onlyDigits = /[0-9]/;
                  const key = String.fromCharCode(e.which);
                  if (!onlyDigits.test(key)) {
                    e.preventDefault();
                  }
                }}
                value={state.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
                style={{ marginTop: "15px" }}
              />
              </Form.Item>
            </Col>
          </Row>
      </div>
    </Form>
  );
};

export default CreditCardForm;
