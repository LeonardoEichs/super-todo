import http from "http-common";

interface EditTodoProp {
  title?: string;
  description?: string;
  status?: TodoStatus;
}

interface CreateTodoProp {
  title: string;
  description: string;
  status: TodoStatus;
}

enum TodoStatus {
  DONE = "done",
  DOING = "doing",
  TODO = "todo",
}

class TodosService {
  async getAll() {
    return await http.get("/todos");
  }

  async get(id: string) {
    return await http.get(`/todos/${id}`);
  }

  async search(searchTerm: string) {
    return await http.get(`/todos?q=${searchTerm}`);
  }

  async update(id: string, data: EditTodoProp) {
    return await http.patch(`/todos/${id}`, data);
  }

  async create(data: CreateTodoProp) {
    return await http.post(`/todos`, data);
  }

  async delete(id: string) {
    return await http.delete(`/todos/${id}`);
  }
}

export default new TodosService();
