import { Container } from "./styles";
import ImgPreview from "components/ImgPreview";

interface ConfirmationProps {
  previousStep: any;
  nextStep: any;
  formData: FormDataProps;
}

interface FormDataProps {
  name: string;
  username: string;
  email: string;
  password: string;
  birth_date: Date;
  profilePic: File;
  otherComments: string;
  usePurpose: string;
  otherProducts: string[];
}

function Confirmation({ previousStep, nextStep, formData }: ConfirmationProps) {
  return (
    <Container>
      <h1>Confirmation</h1>
      <div>
        <p>
          Profile Pic:{" "}
          {formData.profilePic ? (
            <ImgPreview file={formData.profilePic} />
          ) : (
            <p>No profile picture</p>
          )}
        </p>
        <p>Name: {formData.name}</p>
        <p>Username: {formData.username}</p>
        <p>Email: {formData.email}</p>
        <p>Birth Date: {formData.birth_date.toISOString().split("T")[0]}</p>
        <p>Other comments: {formData.otherComments}</p>
        <p>Purpose: {formData.usePurpose}</p>
        <p>Other products: </p>
        <ul>
          {formData.otherProducts.map((product) => (
            <li key={product}>{product}</li>
          ))}
        </ul>
      </div>
      <button onClick={previousStep}>Previous</button>
      <button onClick={nextStep}>Continue</button>
    </Container>
  );
}

export default Confirmation;
