import { ModalContainer, ButtonContainer } from "../styles";

import { useState } from "react";

import TodosService from "services/todos.services";

import { toast } from "react-toastify";

import { TodoStatus } from "ts/enums/todo";
import { TodoProp } from "ts/types/todo";

import generateRandomId from "utils/generateRandomId";

interface CreateModalProp {
  onClose: any;
  setTodos: any;
}

type EventTargetDestructuring = { name: string; value: string };

const defaultTodo: TodoProp = {
  id: generateRandomId(),
  title: "",
  description: "",
  status: TodoStatus.TODO,
};

function CreateModal({ onClose, setTodos }: CreateModalProp) {
  const [body, setBody] = useState<TodoProp>(defaultTodo);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const editValues = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value }: EventTargetDestructuring = e.target;
    setBody((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const createTodo = async () => {
    setIsLoading(true);
    setBody((prevState) => {
      return { ...prevState, id: generateRandomId() };
    });
    await TodosService.create(body);
    const todosFetch = await TodosService.getAll();
    setTodos(todosFetch.data);
    setIsLoading(false);
    toast.warn(`Created ${body.title}!`, {
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
      <h1>Create Todo</h1>
      <hr
        style={{ border: "0.5px solid var(--gray-100)", margin: "1.5rem 0" }}
      />
      <div className="row">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          onChange={(e) => editValues(e)}
          value={body.title}
        />
      </div>
      <div className="row">
        <label htmlFor="title">Description</label>
        <textarea
          style={{ resize: "none" }}
          name="description"
          value={body.description}
          onChange={(e) => editValues(e)}
        />
      </div>
      <div className="row">
        <select name="status" value={body.status} onChange={editValues}>
          {Object.entries(TodoStatus).map(([status, name]) => (
            <option key={status} value={name}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <hr />
      <ButtonContainer>
        <button onClick={onClose}>Close</button>
        <button onClick={() => createTodo()}>
          {isLoading ? "Loading..." : "Create"}
        </button>
      </ButtonContainer>
    </ModalContainer>
  );
}

export default CreateModal;
