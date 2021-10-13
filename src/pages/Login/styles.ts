import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5rem 0;

  & > * {
    margin-bottom: 1.5rem;
  }

  a {
    color: var(--gray-500);
    display: inline-block;
    margin: -2rem 0;
    text-decoration: none;
    &:visited {
      text-decoration: none;
    }
    &:hover {
      color: var(--primary);
      transform: scale(1.1);
    }
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;

    & > * {
      margin-bottom: 2rem;
    }

    input {
      padding: 0.75rem;
      width: 100%;
    }

    button {
      margin-top: 2rem;
      padding: 1rem 0;
    }
  }
`;
