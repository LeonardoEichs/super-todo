import { Container } from "./styles";

import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-date-picker";

const FormikDatePicker = ({ ...props }: any) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val: Date) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};

export default FormikDatePicker;
