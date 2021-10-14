import { Container } from "./styles";

interface InputProps {
  type: string;
  name: string;
  value: string;
  onChange(e?: React.ChangeEvent<HTMLInputElement>): void;
  id?: string;
  placeholder?: string;
  labelcontent?: string;
  fielderrors?: string[];
  [key: string]: any;
}

function Input(props: InputProps) {
  return (
    <Container>
      {props.id && props.labelcontent && (
        <div>
          <label htmlFor={props.id}>{props.labelcontent}</label>
        </div>
      )}
      <input {...props} />
      {props.fielderrors
        ? props.fielderrors.length > 0
          ? props.fielderrors.map((error, index) => (
              <p
                key={index}
                style={{ fontSize: "0.8rem", marginTop: "1rem", color: "red" }}
              >
                {error}
              </p>
            ))
          : null
        : null}
    </Container>
  );
}

export default Input;
