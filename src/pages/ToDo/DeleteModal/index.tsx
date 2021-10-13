import { Container } from "./styles";

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
    <Container>
      <h1>Delete</h1>
      <h2>Are you sure you want to delete?</h2>
      <button onClick={onClose}>No</button>
      <button onClick={deleteItem}>Delete</button>
    </Container>
  );
}

export default DeleteModal;
