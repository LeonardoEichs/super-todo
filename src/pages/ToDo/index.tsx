import { useEffect, useState } from "react";

import TodosService from "services/todos.services";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Modal from "components/Modal";
import EditModal from "pages/ToDo/EditModal";
import CreateModal from "pages/ToDo/CreateModal";
import DeleteModal from "components/DeleteModal";

import { Container } from "./styles";

import getStatusColor from "utils/getStatusColor";

import { TodoStatus } from "ts/enums/todo";
import { TodoProp } from "ts/types/todo";

import generateRandomId from "utils/generateRandomId";

interface EditTodoProp {
  title?: string;
  description?: string;
  status?: TodoStatus;
}

const defaultTodos: TodoProp[] = [
  {
    id: generateRandomId(),
    title: "",
    description: "",
    status: TodoStatus.TODO,
  },
];

function ToDo() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [todos, setTodos] = useState<TodoProp[]>(defaultTodos);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
    await TodosService.delete(id);
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.warn(`Deletado!`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };

  const editTodo = async (id: string, body: EditTodoProp) => {
    handleShowModal();
    // await TodosService.update(id, body);
    // setTodos(
    //   todos.map((todo) => {
    //     if (todo.id === id) return { ...todo, ...body };
    //     return todo;
    //   })
    // );
  };

  return (
    <Container>
      <h1>ToDo</h1>
      <input
        type="text"
        name="search"
        id="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="todo-list">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {error ? (
              <p>{error}</p>
            ) : (
              todos.map((todo) => (
                <div key={todo.id}>
                  <h3 style={{ display: "inline-block", marginRight: "1rem" }}>
                    {todo.title} -{" "}
                    <span style={{ color: getStatusColor(todo.status) }}>
                      {todo.status}
                    </span>
                  </h3>
                  <button onClick={() => deleteTodo(todo.id)}>x</button>
                  <button
                    onClick={() =>
                      editTodo(todo.id, { status: TodoStatus.DONE })
                    }
                  >
                    Edit
                  </button>
                  <p>{todo.description}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
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
      {showModal ? (
        <Modal>
          {/* <EditModal
            setTodos={setTodos}
            onClose={handleCloseModal}
            info={todos[0]}
          /> */}
          {/* <DeleteModal onClose={handleCloseModal} /> */}
          <CreateModal onClose={handleCloseModal} setTodos={setTodos} />
        </Modal>
      ) : null}
    </Container>
  );
}

export default ToDo;
