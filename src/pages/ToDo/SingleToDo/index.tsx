import { useState, useEffect } from "react";
import { Container } from "./styles";

import { useParams } from "react-router-dom";

import TodosService from "services/todos.services";

import { TodoProp } from "ts/types/todo";
import { TodoStatus } from "ts/enums/todo";

interface IUriParams {
  id: string;
}

const defaultTodos: TodoProp = {
  id: "",
  title: "",
  description: "",
  status: TodoStatus.TODO,
};

function SingleToDo() {
  let { id: uriId } = useParams<IUriParams>();
  const [todo, setTodo] = useState<TodoProp>(defaultTodos);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      setError("");
      setIsLoading(true);
      try {
        const todoFetch = await TodosService.get(uriId);
        setTodo(todoFetch.data);
      } catch (error) {
        setError("Failed loading list");
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <Container>
      {error ? (
        <h1>Error</h1>
      ) : isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <h1>
            {todo.title} - {todo.status}
          </h1>
          <p>{todo.description}</p>
        </>
      )}
    </Container>
  );
}

export default SingleToDo;
