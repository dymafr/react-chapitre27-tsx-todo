import axios from 'axios';
import { Todo } from '../interfaces';

const apiFirebase = axios.create({
  baseURL: 'https://todo-r-c17.firebaseio.com/',
});

export function saveTodos(todos: Todo[]) {
  return apiFirebase.put('todos.json', todos);
}

export default apiFirebase;
