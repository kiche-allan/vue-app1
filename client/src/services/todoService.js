import axios from "axios";

const API_BASE_URL = process.env.VUE_APP_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  // Get all todos
  getTodos() {
    return apiClient.get("/todos");
  },

  // Get single todo
  getTodo(id) {
    return apiClient.get(`/todos/${id}`);
  },

  // Create new todo
  createTodo(text) {
    return apiClient.post("/todos", { text });
  },

  // Update todo
  updateTodo(id, data) {
    return apiClient.put(`/todos/${id}`, data);
  },

  // Delete todo
  deleteTodo(id) {
    return apiClient.delete(`/todos/${id}`);
  },

  // Toggle todo completion
  toggleTodo(id) {
    return apiClient.patch(`/todos/${id}/toggle`);
  },
};
