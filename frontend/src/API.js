import axios from "axios";

const BASE_URL = 'http://localhost:4001';

export const getTodos = async () => {
  const response = await axios.get(`${BASE_URL}/todos`);
  return response;
};

export const createTodo = async (formData) => {
  const response = await axios.post(`${BASE_URL}/todos`, formData);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(`${BASE_URL}/todos/${id}`);
  return response.data;
};
