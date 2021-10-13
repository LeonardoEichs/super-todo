import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  .error {
    color: var(--danger);
    margin-top: 0.5rem;
    font-size: 0.8rem;
  }

  & > * {
    margin-bottom: 1.5rem;
  }

  .row {
    p {
      margin-left: 1rem;
    }
    li {
      margin-left: 2rem;
    }
    label {
      font-weight: 600;
      display: block;
      margin-bottom: 1rem;
    }
    margin-top: 1.5rem;
  }

  .react-date-picker {
    input {
      padding: 0.25rem 0.5rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;

    input {
      padding: 0.75rem;
      width: 100%;
    }
  }

  .inputButton {
    width: 50%;
    margin: 1rem 0 2rem;
  }

  .checkbox {
    margin-top: 1rem;
    input {
      width: 15%;
    }
  }
`;

export const ButtonContainer = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: end;
`;
