import { injectReducer } from '../../../store';
import { todosReducer, TodosState } from './reducers';
import { AuthState } from '../../../store/reducers';

injectReducer('todos', todosReducer);

export interface GlobalTodoState {
  authReducer?: AuthState;
  todos: TodosState;
}
