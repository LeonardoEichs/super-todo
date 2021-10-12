import { useEffect, useState } from "react";

import TodosService from "services/todos.services";

import { Container } from "./styles";

enum TodoStatus {
  DONE = "done",
  DOING = "doing",
  TODO = "todo",
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "done":
      return "green";
    case "doing":
      return "orange";
    case "todo":
      return "red";
    default:
      return "black";
  }
};

interface TodoProp {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
}

interface EditTodoProp {
  title?: string;
  description?: string;
  status?: TodoStatus;
}

const defaultTodos: TodoProp[] = [
  {
    id: 0,
    title: "",
    description: "",
    status: TodoStatus.TODO,
  },
];

function ToDo() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [todos, setTodos] = useState<TodoProp[]>(defaultTodos);

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

  const deleteTodo = async (id: number) => {
    await TodosService.delete(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = async (id: number, body: EditTodoProp) => {
    await TodosService.update(id, body);
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) return { ...todo, ...body };
        return todo;
      })
    );
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
    </Container>
  );
}

export default ToDo;
