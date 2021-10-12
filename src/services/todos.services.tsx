import axios from "axios";

const URL = "http://localhost:3333/todos";

interface EditTodoProp {
  title?: string;
  description?: string;
  status?: TodoStatus;
}

enum TodoStatus {
  DONE = "done",
  DOING = "doing",
  TODO = "todo",
}

class TodosService {
  async getAll() {
    return await axios.get(URL);
  }

  async search(searchTerm: string) {
    return await axios.get(`${URL}?q=${searchTerm}`);
  }

  async update(id: number, data: EditTodoProp) {
    return await axios.patch(`${URL}/${id}`, data);
  }

  async delete(id: number) {
    return await axios.delete(`${URL}/${id}`);
  }
}

export default new TodosService();
