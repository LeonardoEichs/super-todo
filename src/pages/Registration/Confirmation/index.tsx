import { Container } from "./styles";

interface ConfirmationProps {
  previousStep: any;
  nextStep: any;
  formData: FormDataProps;
}

interface FormDataProps {
  username: string;
  email: string;
  password: string;
  birth_date: Date;
}

function Confirmation({ previousStep, nextStep, formData }: ConfirmationProps) {
  return (
    <Container>
      <h1>Confirmation</h1>
      <div>
        <p>Username: {formData.username}</p>
        <p>Email: {formData.email}</p>
        <p>Birth Date: {formData.birth_date}</p>
      </div>
      <button onClick={previousStep}>Previous</button>
      <button onClick={nextStep}>Continue</button>
    </Container>
  );
}

export default Confirmation;
