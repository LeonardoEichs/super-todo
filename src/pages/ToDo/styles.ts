import styled from "styled-components";

export const Container = styled.div``;

export const SearchInput = styled.input`
  width: max(480px, 40%);
  padding: 1rem;
`;

export const TodoList = styled.div`
  margin-top: 2.5rem;
`;

export const CreateTodoButton = styled.button`
  margin-top: 1.5rem;
  margin-left: -0.05rem;
  padding: 1rem 2rem;
  display: block;
`;

export const ListItem = styled.div`
  margin-left: -1rem;
  margin-bottom: 0.5rem;
  padding: 2.5rem 1rem;
  background-color: var(--white);
  border: 1px solid var(--gray-100);
  border-radius: 0.5rem;
  width: max(680px, 60%);
`;

export const ListItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
`;
export const ListItemHeaderButtons = styled.div``;

export const ModalContainer = styled.div`
  .row {
    margin: 1rem 0.5rem;

    label {
      display: block;
      margin: 0.25rem 0;
    }
  }
`;

export const ButtonContainer = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: end;
`;
