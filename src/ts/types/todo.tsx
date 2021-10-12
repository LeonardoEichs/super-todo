import { TodoStatus } from "ts/enums/todo";

export interface TodoProp {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
}
