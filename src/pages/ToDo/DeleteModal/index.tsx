import { ModalContainer, ButtonContainer } from "../styles";

import TodosService from "services/todos.services";

import { TodoProp } from "ts/types/todo";

import { toast } from "react-toastify";

interface DeleteModelProps {
  activeItem: TodoProp;
  onClose: any;
  setTodos: any;
}

function DeleteModal({ onClose, setTodos, activeItem }: DeleteModelProps) {
  const deleteItem = async () => {
    await TodosService.delete(activeItem.id);
    setTodos((prevState: TodoProp[]) => {
      return prevState.filter((todo) => todo.id !== activeItem.id);
    });
    toast.warn(`Deleted!`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });

    onClose();
  };

  return (
    <ModalContainer>
      <h1>Delete</h1>
      <div className="row">
        <p>Are you sure you want to delete?</p>
      </div>
      <ButtonContainer>
        <button onClick={onClose}>No</button>
        <button className={"danger"} onClick={deleteItem}>
          Delete
        </button>
      </ButtonContainer>
    </ModalContainer>
  );
}

export default DeleteModal;
