import styled from "styled-components";

export const Container = styled.div`
  .row {
    display: block;
    margin: 1rem 0;

    & > label {
      display: block;
      margin: 0.5rem 0;
    }

    & > .checkbox > label {
      margin: 0.5rem 2rem;
    }

    & > .error {
      display: block;
      color: red;
      margin: 0.5rem 0.25rem;
      font-size: 0.8rem;
    }
  }
`;
