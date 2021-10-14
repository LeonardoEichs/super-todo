import { ModalContainer, ButtonContainer } from "../styles";

import { SetStateAction, useState } from "react";

import TodosService from "services/todos.services";

import { toast } from "react-toastify";

import { TodoStatus } from "ts/enums/todo";
import { TodoProp } from "ts/types/todo";

interface EditModalProp {
  activeItem: TodoProp;
  onClose: () => void;
  setTodos: React.Dispatch<SetStateAction<TodoProp[]>>;
}

type EventTargetDestructuring = { name: string; value: string };

function EditModal({ activeItem, onClose, setTodos }: EditModalProp) {
  const [body, setBody] = useState<TodoProp>(activeItem);

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

  const saveChanges = async (body: TodoProp) => {
    await TodosService.update(body.id, body);
    setTodos((prevState: TodoProp[]) => {
      return prevState.map((todo) => {
        if (todo.id === body.id) return { ...todo, ...body };
        return todo;
      });
    });
    toast.warn(`Edited!`, {
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
      <h1>Edit</h1>
      <hr
        style={{ border: "0.5px solid var(--gray-100)", margin: "1.5rem 0" }}
      />
      <div className="row">
        <label htmlFor="id">ID</label>
        <input type="text" name="id" value={body.id} disabled />
      </div>
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
        <button className={"primary"} onClick={() => saveChanges(body)}>
          Save
        </button>
      </ButtonContainer>
    </ModalContainer>
  );
}

export default EditModal;
