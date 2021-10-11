import { ReactNode } from "react";

import { Container } from "./styles";

interface InputProps {
  id: string;
  type: string;
  name: string;
  value: string;
  onChange: any;
  placeholder?: string;
  labelContent?: string;
  fieldErrors?: string[];
  [key: string]: any;
}

function Input(props: InputProps) {
  return (
    <Container>
      {props.id && props.labelContent && (
        <div>
          <label htmlFor={props.id}>{props.labelContent}</label>
        </div>
      )}
      <input {...props} />
      {props.fieldErrors
        ? props.fieldErrors.length > 0
          ? props.fieldErrors.map((error) => (
              <p style={{ color: "red" }}>{error}</p>
            ))
          : null
        : null}
    </Container>
  );
}

export default Input;
