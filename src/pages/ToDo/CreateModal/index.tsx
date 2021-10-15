import { ModalContainer, ButtonContainer } from "../styles";

import { useState } from "react";

import TodosService from "services/todos.services";

import { toast } from "react-toastify";

import { TodoStatus } from "ts/enums/todo";
import { TodoProp } from "ts/types/todo";

import { v4 as uuidv4 } from "uuid";

interface CreateModalProp {
  onClose: () => void;
  setTodos: (
    value: TodoProp[] | ((prevState: TodoProp[]) => TodoProp[])
  ) => void;
}

type EventTargetDestructuring = { name: string; value: string };

const defaultTodo: TodoProp = {
  id: uuidv4(),
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
    const id = uuidv4();
    console.log(id);
    const postBody = { ...body, id: id };
    await TodosService.create(postBody);
    setTodos((prevState) => {
      return [...prevState, postBody];
    });
    // const todosFetch = await TodosService.getAll();
    // setTodos(todosFetch.data);
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
      <hr style={{ border: "1px solid var(--gray-100)", margin: "1.5rem 0" }} />
      <ButtonContainer>
        <button onClick={onClose}>Close</button>
        <button
          disabled={isLoading}
          className={"primary"}
          onClick={() => createTodo()}
        >
          {isLoading ? "Loading..." : "Create"}
        </button>
      </ButtonContainer>
    </ModalContainer>
  );
}

export default CreateModal;
