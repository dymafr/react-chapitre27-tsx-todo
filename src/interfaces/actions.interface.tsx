import { Todo } from './todo.interface';
import {
  EDIT_TODO_SUCCESS,
  EDIT_TODO_ERROR,
  ADD_TODO_SUCCESS,
  ADD_TODO_ERROR,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_ERROR,
  REQUEST_TODO,
  FETCH_TODO_ERROR,
  TOGGLE_EDIT_MODE,
  FETCH_TODO_SUCCESS,
} from '../features/todos/store/actions';

export interface EditTodoSuccessAction {
  type: typeof EDIT_TODO_SUCCESS;
  payload: {
    todo: Todo;
    index: number;
  };
}

export interface EditTodoErrorAction {
  type: typeof EDIT_TODO_ERROR;
  payload: any;
}

export interface AddTodoSuccessAction {
  type: typeof ADD_TODO_SUCCESS;
  payload: Todo;
}

export interface AddTodoErrorAction {
  type: typeof ADD_TODO_ERROR;
  payload: any;
}

export interface DeleteTodoSuccessAction {
  type: typeof DELETE_TODO_SUCCESS;
  payload: number;
}

export interface DeleteTodoErrorAction {
  type: typeof DELETE_TODO_ERROR;
  payload: any;
}

export interface RequestTodoAction {
  type: typeof REQUEST_TODO;
}

export interface FetchTodoErrorAction {
  type: typeof FETCH_TODO_ERROR;
  payload: any;
}

export interface ToggleEditModeAction {
  type: typeof TOGGLE_EDIT_MODE;
  payload: number;
}

export interface FetchTodoSuccessAction {
  type: typeof FETCH_TODO_SUCCESS;
  payload: Todo[];
}
