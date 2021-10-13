import { Container, ButtonContainer } from "../styles";
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
        <div style={{ float: "right" }} className="row">
          {formData.profilePic.name ? (
            <>
              <label>Profile Pic:</label>
              <ImgPreview file={formData.profilePic} />
            </>
          ) : null}
        </div>

        <div className="row">
          <label>Name:</label>
          <p>{formData.name}</p>
        </div>
        <div className="row">
          <label>Username:</label>
          <p>{formData.username}</p>
        </div>
        <div className="row">
          <label>Email:</label>
          <p>{formData.email}</p>
        </div>
        <div className="row">
          <label>Birth Date:</label>
          <p>{formData.birth_date.toISOString().split("T")[0]}</p>
        </div>
        <div className="row">
          <label>Other comments:</label>
          <p>{formData.otherComments}</p>
        </div>
        <div className="row">
          <label>Purpose:</label>
          <p>{formData.usePurpose}</p>
        </div>
        <div className="row">
          <label>Other products:</label>
          <ul>
            {formData.otherProducts.map((product) => (
              <li key={product}>{product}</li>
            ))}
          </ul>{" "}
        </div>
      </div>
      <ButtonContainer>
        <button onClick={previousStep}>Previous</button>
        <button className={"primary"} onClick={nextStep}>
          Continue
        </button>
      </ButtonContainer>
    </Container>
  );
}

export default Confirmation;
