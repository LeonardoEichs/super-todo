import { ReactNode } from "react";

import { Container } from "./styles";

interface SurveyProps {
  previousStep: any;
  nextStep: any;
}

function SurveyFields({ previousStep, nextStep }: SurveyProps) {
  return (
    <Container>
      <h1>SurveyFields</h1>
      <button onClick={previousStep}>Previos</button>
      <button onClick={nextStep}>Continue</button>
    </Container>
  );
}

export default SurveyFields;
