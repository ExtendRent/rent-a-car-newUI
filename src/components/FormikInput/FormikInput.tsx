import React from "react";
import { ErrorMessage, Field } from "formik";
import './FormikInput.css'
type Props = {
    label: string;
    name: string;
    type?: string;
    placeHolder?: string;
    value?: string; 
   
};
  

const FormikInput = (props: Props) => {
  return (
    <div>
      <label className="form-label">{props.label}</label>
      <Field
        name={props.name}
        type={props.type || "text"}
        className="inputForm"
        placeholder={props.placeHolder}
      />
      <ErrorMessage name={props.name}>
        {message => <span className="text-danger">{message}</span>}
      </ErrorMessage>
    </div>
  );
};

export default FormikInput;