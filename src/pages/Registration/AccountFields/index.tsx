import { ReactNode } from "react";

import { Container } from "./styles";

interface AccountFieldsProps {
  nextStep: any;
}

function AccountFields({ nextStep }: AccountFieldsProps) {
  return (
    <Container>
      <h1>AccountFields</h1>
      <button onClick={nextStep}>Continue</button>
    </Container>
  );
}

export default AccountFields;
