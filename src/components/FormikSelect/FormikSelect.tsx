import React from 'react';
import { useField } from 'formik';
import Select from 'react-select';

interface FormikSelectProps {
  label: string;
  options: { value: any; label: string }[];
  name: string;
}

const FormikSelect: React.FC<FormikSelectProps> = ({ label, options, name }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (selectedOption: any) => {
    helpers.setValue(selectedOption ? selectedOption.value : ''); // Tek bir değer seçildiğinde seçilen değeri ayarlar
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "#121212", // Renkli arka plan
      borderColor: state.isFocused ? "rgb(126, 4, 10)" : "#7a7a7a", // Odaklandığında ya da normal durumda kenarlık rengi
      borderRadius: "10px",
      color: "rgba(255, 255, 255, 0.93)", // Metin rengi
      boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(126, 4, 10, 0.25)" : "none", // Odaklandığında gölge
      "&:hover": {
        borderColor: state.isFocused ? "rgb(126, 4, 10)" : "#7a7a7a", // Fare üzerine geldiğinde kenarlık rengi
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "#121212", // Seçenek menüsünün arka plan rengi
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#848484" : "#121212", // Seçeneklerin arka plan rengi
      color: state.isSelected ? "black" : "white", // Seçeneklerin metin rengi
      "&:hover": {
        backgroundColor: "#e6e6e6", // Fare üzerine geldiğinde seçeneğin arka plan rengi
      },
    }),
  };
  

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Select
        id={name}
        options={options}
        value={options.find(option => option.value === field.value)} // Seçilen değeri belirtmek için options dizisindeki uygun seçeneği bulur
        onChange={handleChange}
        onBlur={() => helpers.setTouched(true)}
        styles={{
          ...customStyles,
          singleValue: (provided: any) => ({
            ...provided,
            color: 'white', // Seçilen değerin metin rengini beyaz yap
          }),
          container: (provided, state) => ({
               ...provided,
               marginTop: '10px',
           }),
          
        }}
      />
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormikSelect;
