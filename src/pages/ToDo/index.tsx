import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import TodosService from "services/todos.services";

import { AuthContext } from "contexts/auth.context";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Modal from "components/Modal";
import EditModal from "pages/ToDo/EditModal";
import CreateModal from "pages/ToDo/CreateModal";
import DeleteModal from "pages/ToDo/DeleteModal";

import {
  Container,
  TodoList,
  SearchInput,
  CreateTodoButton,
  ListItem,
  ListItemHeader,
  ListItemHeaderButtons,
} from "./styles";

import getStatusColor from "utils/getStatusColor";

import { TodoStatus } from "ts/enums/todo";
import { TodoProp } from "ts/types/todo";

const defaultTodosList: TodoProp[] = [
  {
    id: "",
    title: "",
    description: "",
    status: TodoStatus.TODO,
  },
];

const defaultTodos: TodoProp = {
  id: "",
  title: "",
  description: "",
  status: TodoStatus.TODO,
};

enum ModalBody {
  NONE,
  CREATE,
  EDIT,
  DELETE,
}

function ToDo() {
  const { authState, handleLogout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState<ModalBody>(ModalBody.NONE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [todos, setTodos] = useState<TodoProp[]>(defaultTodosList);
  const [activeItem, setActiveItem] = useState<TodoProp>(defaultTodos);

  const handleCloseModal = () => {
    setActiveItem(defaultTodos);
    setShowModal(ModalBody.NONE);
  };

  useEffect(() => {
    (async () => {
      setError("");
      setIsLoading(true);
      try {
        const todosFetch =
          searchTerm.length > 0
            ? await TodosService.search(searchTerm)
            : await TodosService.getAll();
        setTodos(todosFetch.data);
      } catch (error) {
        setError("Failed loading list");
      }
      setIsLoading(false);
    })();
  }, [searchTerm]);

  const deleteTodo = async (id: string) => {
    const todoWithItem: TodoProp | undefined = todos.find(
      (todo) => todo.id === id
    );
    if (!todoWithItem) return null;
    setActiveItem(todoWithItem);
    setShowModal(ModalBody.DELETE);
  };

  const editTodo = async (id: string) => {
    const todoWithItem: TodoProp | undefined = todos.find(
      (todo) => todo.id === id
    );
    if (!todoWithItem) return null;
    setActiveItem(todoWithItem);
    setShowModal(ModalBody.EDIT);
  };

  const chooseModal = (type: ModalBody) => {
    switch (type) {
      case ModalBody.EDIT:
        return (
          <EditModal
            setTodos={setTodos}
            onClose={handleCloseModal}
            activeItem={activeItem}
          />
        );
      case ModalBody.CREATE:
        return <CreateModal onClose={handleCloseModal} setTodos={setTodos} />;
      case ModalBody.DELETE:
        return (
          <DeleteModal
            onClose={handleCloseModal}
            setTodos={setTodos}
            activeItem={activeItem}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <ListItemHeader>
        <h1>ToDo</h1>
        <h1>{authState.name}</h1>
        <button onClick={handleLogout}>Logout</button>
      </ListItemHeader>
      <SearchInput
        type="text"
        name="search"
        id="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <CreateTodoButton
        className={"primary"}
        onClick={() => setShowModal(ModalBody.CREATE)}
      >
        Create New Todo
      </CreateTodoButton>
      <TodoList>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {error ? (
              <p>{error}</p>
            ) : (
              todos.map((todo) => (
                <ListItem key={todo.id}>
                  <ListItemHeader>
                    <h3
                      style={{ display: "inline-block", marginRight: "1rem" }}
                    >
                      {todo.title} -{" "}
                      <span
                        style={{
                          textTransform: "uppercase",
                          color: getStatusColor(todo.status),
                        }}
                      >
                        {todo.status}
                      </span>
                    </h3>
                    <ListItemHeaderButtons>
                      <button
                        className={"danger"}
                        onClick={() => deleteTodo(todo.id)}
                      >
                        Delete
                      </button>
                      <button onClick={() => editTodo(todo.id)}>Edit</button>
                    </ListItemHeaderButtons>
                  </ListItemHeader>
                  <p>{todo.description}</p>
                </ListItem>
              ))
            )}
          </div>
        )}
      </TodoList>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
      />
      {showModal !== ModalBody.NONE ? (
        <Modal>{chooseModal(showModal)}</Modal>
      ) : null}
    </Container>
  );
}

export default ToDo;
