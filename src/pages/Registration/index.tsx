import { useState } from "react";
import { Container } from "./styles";
import AccountFields from "pages/Registration/AccountFields";
import SurveyFields from "pages/Registration/SurveyFields";
import Confirmation from "pages/Registration/Confirmation";
import Success from "pages/Registration/Success";

enum PageStep {
  ACCOUNT_FIELDS,
  SURVEY_FIELDS,
  CONFIRMATION,
  SUCCESS,
}

interface FormDataProps {
  name: string;
  username: string;
  email: string;
  password: string;
  birth_date: Date;
  otherComments: string;
  usePurpose: string;
  otherProducts: string[];
}

const defaultFormState: FormDataProps = {
  name: "",
  username: "",
  email: "",
  password: "",
  birth_date: new Date(),
  otherComments: "",
  usePurpose: "Personal",
  otherProducts: [],
};

function Registration() {
  const [step, setStep] = useState<PageStep>(PageStep.ACCOUNT_FIELDS);
  const [formData, setFormData] = useState<FormDataProps>(defaultFormState);

  const renderSwitch = (step: number) => {
    switch (step) {
      case PageStep.ACCOUNT_FIELDS:
        return (
          <AccountFields
            formData={formData}
            setFormData={setFormData}
            nextStep={() => setStep(PageStep.SURVEY_FIELDS)}
          />
        );
      case PageStep.SURVEY_FIELDS:
        return (
          <SurveyFields
            setFormData={setFormData}
            previousStep={() => setStep(PageStep.ACCOUNT_FIELDS)}
            nextStep={() => setStep(PageStep.CONFIRMATION)}
            formData={formData}
          />
        );
      case PageStep.CONFIRMATION:
        return (
          <Confirmation
            previousStep={() => setStep(PageStep.SURVEY_FIELDS)}
            nextStep={() => setStep(PageStep.SUCCESS)}
            formData={formData}
          />
        );
      case PageStep.SUCCESS:
        return <Success />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <h1>Registration</h1>
      {renderSwitch(step)}
    </Container>
  );
}

export default Registration;
